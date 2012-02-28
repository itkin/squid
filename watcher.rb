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
  files = Dir.glob( File.join( watch_folder, "*.haml" ) )
  files += Dir.glob( File.join( watch_folder, "*.less" ) )

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
      output_folder = watch_folder
      ext = f.match(/(less|haml)$/)[1]

      if ext == "haml"
        ex = "haml"
        output_file = f.gsub(/\.haml$/, '.html')
        is_haml = true
        cmd = "#{ex} #{options} #{f} #{output_file}"
      elsif ext == "less"
        ex = "lessc"
        output_file = f.gsub(/\.less$/, '.css')
        #options = "-x"
        cmd = "#{ex} #{options} #{f} > #{output_file}"
      end

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