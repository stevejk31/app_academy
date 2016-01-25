require 'addressable/uri'
require 'rest-client'

url = Addressable::URI.new(
  scheme: 'http',
  host: 'localhost',
  port: 3000,
  path: '/users/5.json',
  query_values: {
    'user[name]' => 'joe',
    'user[age]' => '45',
    'user[name][nickname]' => 'joey',
    'user_id' => '5'
  }
).to_s

puts RestClient.get(url)
