#  id              :integer          not null, primary key
#  password_digest :string           not null
#  user_name       :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
User.create!(user_name: "abc", password: "abcabc")
User.create!(user_name: "def", password: "defdef")
User.create!(user_name: "qwe", password: "qweqwe")
User.create!(user_name: "zxc", password: "zxczxc")
User.create!(user_name: "sdf", password: "sdfsdf")
User.create!(user_name: "xcv", password: "xcvxvc")
User.create!(user_name: "wer", password: "werwer")
