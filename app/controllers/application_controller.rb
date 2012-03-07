class ApplicationController < ActionController::Base
  protect_from_forgery

  layout :pick_layout

  def pick_layout
    request.xhr? ? false : "application"
  end
end
