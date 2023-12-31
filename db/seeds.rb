# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Users
User.create(username: 'firstSeedUser', password_digest: BCrypt::Password.create('password'))
User.create(username: 'secondSeedUser', password_digest: BCrypt::Password.create('password'))

# Profile 
user = User.first
Profile.create(name: Faker::Name.name, bio: Faker::Lorem.paragraph, height: 70, weight: 200, user: user)

# Instructors

# Locations

# Activities