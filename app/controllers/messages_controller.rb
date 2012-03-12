class MessagesController < ApplicationController

  def create
    @message = Message.new(params[:message])
    if @message.valid?
      begin
        MessagesMailer.confirmation_email(@message).deliver
        MessagesMailer.new_contact_email(@message).deliver
      rescue
        MessagesMailer.email_no_sent(@message).deliver
      end
    else
      render :partial => 'messages/form', :locals => {:message => @message}, :status => 422
    end
  end
end
