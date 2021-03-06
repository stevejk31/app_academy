require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

  describe "GET new" do

    it "renders the new template" do
      get :new
      expect(response).to render_template("new")
    end

  end

  describe "GET create" do

    it "redirects to goals index" do
      get :new
      expect(response).to render_template("new")
    end

  end
end
