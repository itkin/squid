module ApplicationHelper
  include BootstrapFormBuilder::FormHelper

  def feature(position, elt_id, key)
    render :partial => "home/feature", :locals => {:position => position, :key => key, :elt_id => elt_id }
  end

end
