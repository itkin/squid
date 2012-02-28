#!/usr/local/bin/ruby

require "rubygems"
require "hpricot"


trap("SIGINT") { exit }

if ARGV.empty?
  puts "Usage: #{$0} watch_folder"
  puts "       Example: #{$0} ."
  exit
end

watch_folder = ARGV[0]
mtimes = {}

puts "Watching #{watch_folder} and subfolders for changes in SASS & HAML files..."

while true do
  files = Dir.glob( File.join( watch_folder, "**", "*.haml" ) )
  files += Dir.glob( File.join( watch_folder, "**", "*.sass" ) )

  new_hash = files.collect {|f| [ f, File.stat(f).mtime.to_i ] }
  hash ||= new_hash
  diff_hash = new_hash - hash
  
  unless diff_hash.empty?
    hash = new_hash
    
    diff_hash.each do |df|
      f = df.first
      
      output_file = ""
      options = ""
      is_haml = false
      
      ex = f.match(/(sass|haml)$/)[1]
      case ex
      when "haml"
        output_folder = "#{watch_folder}/html"
        Dir.mkdir(output_folder) unless File.directory?(output_folder)
        
        output_file = f.gsub(/\/haml\/([^\/]+)\.haml/, '/html/\1.html')
        is_haml = true

      when "sass"
        output_folder = "#{watch_folder}/css"
        Dir.mkdir(output_folder) unless File.directory?(output_folder)

        output_file = f.gsub(/\/sass\/([^\/]+)\.sass/, '/css/\1.css')
        options = "--style expanded"

      end

      cmd = "#{ex} #{options} #{f} #{output_file}"
      puts "- #{cmd}"
      system(cmd)
      
      next unless is_haml
      
      html = Hpricot( File.read(output_file) )
      (html/"include").each do |inc|
        fragment = File.read("#{watch_folder}/output/#{ inc['file'] }.html") rescue nil
        next unless fragment
      
        inc.swap("\n<!-- INCLUDE: #{ inc['file'] } START -->\n#{fragment}<!-- INCLUDE: #{ inc['file'] } END -->\n")
      end
      
      File.open(output_file, "w") do |f|
        f.puts html.to_html
      end
      
    end
  end
  
  sleep 1
end