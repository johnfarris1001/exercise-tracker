# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


# require 'date'
# # Users

# User.create(username: 'firstSeedUser', password_digest: BCrypt::Password.create('password'))
# User.create(username: 'secondSeedUser', password_digest: BCrypt::Password.create('password'))

# # Profile 

# user = User.find_by(username: 'firstSeedUser')
# Profile.create(name: Faker::Name.name, bio: Faker::Quote.famous_last_words, height: 70, weight: 200, user: user, image: Faker::LoremFlickr.image(size: "50x60", search_terms: ['sports', 'fitness']))

# # Instructors

# 5.times do
#     Instructor.create(name: Faker::Name.name, years: rand(0..20))
# end

# # Locations

# 10.times do
#     Location.create(name: Faker::Company.name, address: Faker::Address.street_address, description: Faker::Marketing.buzzwords)
# end

# # Activities

# user_1 = User.find_by(username: 'firstSeedUser')
# user_2 = User.find_by(username: 'secondSeedUser')
# categories = ['Outdoor Run/Walk', 'Treadmill Run/Walk', 'HIIT', 'Free Weights', 'Class Based Exercise', 'Circuit Training', 'Yoga', 'Pilates']
# durations = (2..11).to_a.map {|n| n*5}
# dates = ((Date.today - 70)..(Date.today))
# days = []
# hours = (8..18).to_a
# dates.each do |d|
#     hours.each do |h|
#         days << DateTime.new(d.year, d.month, d.day, h)
#     end
# end
# start_dates_1 = days.sample(200)
# (0..199).each do |i|
#     Activity.create(category: categories.sample, intensity: rand(1..10), start_time: start_dates_1[i], duration: durations.sample, user_rating: rand(1..5), user: user_1, instructor: Instructor.all.sample, location: Location.all.sample)
# end

# start_dates_2 = days.sample(200)
# (0..199).each do |i|
#     Activity.create(category: categories.sample, intensity: rand(1..10), start_time: start_dates_2[i], duration: durations.sample, user_rating: rand(1..5), user: user_2, instructor: Instructor.all.sample, location: Location.all.sample)
# end