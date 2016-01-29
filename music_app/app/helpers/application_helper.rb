module ApplicationHelper

  def auth_token
    html = <<-HTML
    <input type="hidden"
    name = "authenticity_token"
    value ="#{form_authenticity_token}"
    >
    HTML

    html.html_safe
  end

  def text_form(input_obj, input_type)
    html = <<-HTML
      <label for="#{input_obj}[#{input_type}]">#{input_type.capitalize}: </label>
        <input type = "text"
        name ="#{input_obj}[#{input_type}]"
        >

    HTML

      html.html_safe
    end
end
