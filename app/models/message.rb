class Message
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :name, :email, :object, :content
  validates :name, :email, :object, :content, :presence => true


  validates_format_of :email, :with => /^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/i
  validates_length_of :content, :maximum => 500

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end
end

#class Message
#  include ActiveModel::Validations
#  include ActiveModel::Naming
#  attr_accessor :name, :contact, :object, :content
#
#  validates :name, :contact, :object, :content, :presence => true
#
#  def initialize(attrs={})
#    attrs.each do |key, val|
#      instance_variable_set "@#{key}", val
#    end
#  end
#end