require 'addressable/uri'
require 'rest-client'

url = Addressable::URI.new(
  scheme: 'http',
  host: 'localhost',
  port: 3000,
  path: '/users/2.json'
).to_s

begin
  puts RestClient.delete(
      url
      # { user: { name: 'Jonathan', email: 'jonny@gmail.com' } }
    )
  rescue
    puts "you failed."
  end
