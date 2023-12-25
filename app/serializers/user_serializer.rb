class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile, :unique_instructors, :unique_locations

  has_many :activities, serializer: ActivitySerializer
end
