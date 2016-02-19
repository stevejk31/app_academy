json.extract! @party, :name, :location
json.guests do
  json.array! @party.guests do |guest|
    json.name guest.name
    json.gifts do
      json.array! guest.gifts do |gift|
        json.title gift.title
        json.description gift.description
      end
    end
  end

end
