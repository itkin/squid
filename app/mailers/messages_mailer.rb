class MessagesMailer < ActionMailer::Base

  def confirmation_email(message)
    @message = message
    mail :from => "Guillaume Carniato <contact@squid-corp.com>",
         :to => @message.email

  end

  def new_contact_email(message)
    @message = message
    mail :from => "Rails <no-reply@squid-corp.com>",
         :to => ["iomka@me.com", "nicolas@w3bflows.com"]
  end

  def email_no_sent(message)
    @message = message
    mail :from => "Rails <no-reply@squid-corp.com>",
         :to => ["iomka@me.com", "nicolas@w3bflows.com"]

  end
end
