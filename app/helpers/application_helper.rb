module ApplicationHelper
  include BootstrapFormBuilder::FormHelper

  def feature(position, class_name, key)
    render :partial => "home/feature", :locals => {:position => position, :key => key, :class_name => class_name }
  end

end
