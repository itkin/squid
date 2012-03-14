module ApplicationHelper
  include BootstrapFormBuilder::FormHelper

  def feature(position, class_name, key)
    render :partial => "home/feature", :locals => {:position => position, :key => key, :class_name => class_name }
  end

  def contact_item(key)
    render :partial => "contact_item", :locals => {:key => key}
  end

  def separator(key)
    render :partial => "separator", :locals => {:key => key}
  end

end
