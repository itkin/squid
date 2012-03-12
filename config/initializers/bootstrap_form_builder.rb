#https://gist.github.com/1695087

#<%= bootstrap_form_for @user, html: {class: 'form-horizontal'} do |f| %>
#  <legend>Create an Account</legend>
#
#  <%= f.control_group :email do %>
#    <%= f.email_field :email %>
#  <% end %>
#
#  <%= f.control_group :password do %>
#    <%= f.text_field :password %>
#    <p class="help-block">Must be at least 6 characters</p>
#  <% end %>
#
#  <%= f.control_group :full_name do %>
#    <%= f.text_field :full_name %>
#  <% end %>
#
#  <%= field_set_tag nil, class: 'form-actions' do %>
#    <%= button_tag 'Create account', type: 'submit', class: 'btn primary' %>
#    <%= link_to 'Cancel', root_path %>
#  <% end %>
#<% end %>
class BootstrapFormBuilder < ActionView::Helpers::FormBuilder
  def control_group(method, *args, &block)
    options = args.extract_options!
    error_class = object.errors[method].present? ? 'error' : ''
    @template.field_set_tag(nil, :class => ['control-group', error_class].join(' ')) do
      label(method, options[:label], :class => 'control-label') +
      @template.content_tag(:div, :class => 'controls') do
        doc = Nokogiri::HTML::DocumentFragment.parse(@template.capture(&block))
        if help_block = doc.at_css('.help-block')
          help_block.before inline_errors(method)
        else
          doc.add_child inline_errors(method)
        end
        doc.to_html.html_safe
      end
    end
  end

  private

  def inline_errors(method)
    if object.errors[method].present?
      @template.content_tag :span, object.errors[method].to_sentence, :class => 'help-inline'
    else
      ''
    end
  end

  def self.with_custom_field_error_proc(&block)
    default_field_error_proc = ::ActionView::Base.field_error_proc
    ::ActionView::Base.field_error_proc = proc { |html_tag, instance|  html_tag }
    yield
  ensure
    ::ActionView::Base.field_error_proc = default_field_error_proc
  end

  module FormHelper
    # in ApplicationHelper, include BootstrapFormBuilder::FormHelper
    def bootstrap_form_for(object, options = {}, &block)
      options[:builder] = BootstrapFormBuilder
      options[:html]||={}
      options[:html][:class] ||= "form-horizontal"
      BootstrapFormBuilder.with_custom_field_error_proc do
        form_for(object, options, &block)
      end
    end
  end
end
