require 'spec_helper'
require 'rails_helper'

feature "the signup process" do
  before :each do
    visit "users/new"
  end

  it "has a new user page" do
    expect(page).to have_content "Sign Up"
  end

  feature "signing up a user" do

    it "has forms for name and password" do
      expect(page).to have_content "Name"
      expect(page).to have_content "Password"
      expect(page).to have_button "Sign Up"
    end

    it "successfully signed up and Name shows up on page" do
      fill_in "Name", with: "Connie"
      fill_in "Password", with: "connieconnie"
      click_button 'Sign Up'
      expect(page).to have_content "Connie"
    end

    it "presented an error when name is blank" do
      fill_in "Password", with: "connieconnie"
      click_button 'Sign Up'
      current_path.should eq "/users/new"
      expect(page).to have_content "Name can't be blank"
    end

    it "presented an error when password is blank" do
      fill_in "Name", with: "Connie"
      click_button 'Sign Up'
      current_path.should eq "/users/new"
      expect(page).to have_content "Password is too short"
    end

  end

end

feature "logging in" do
  before :each do
    visit "session/new"
  end
    feature "Logging" do

      it "has fields for name and password" do
        expect(page).to have_content "Name"
        expect(page).to have_content "Password"
        expect(page).to have_button "Log In"
      end

      it "shows username on the homepage after login" do
        visit "/users/new"
        fill_in "Name", with: 'Connie'
        fill_in "Password", with: 'connieconnie'
        click_button 'Sign Up'
        visit "session/new"
        fill_in "Name", with: "Connie"
        fill_in "Password", with: "connieconnie"
        click_button 'Log In'
        expect(page).to have_content "Connie"
      end
      #correct log in redirects to

      #incorrect log in
      it "redirects to Log in page if mistakes" do
        click_button "Log In"
        current_path.should eq "/session/new"
      end

      it "shows Username and/or Password is wrong" do
        click_button "Log In"
        expect(page).to have_content "Incorrect Name and/or Password"
      end



    end

end

feature "logging out" do

  it "begins with logged out state" do
    visit "/goals"
    expect(page).to have_link "Log In"
  end

  it "doesn't show username on the homepage after logout"

end
