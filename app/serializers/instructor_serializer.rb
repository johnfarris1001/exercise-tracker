class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :name, :years, :unique_users, :unique_locations

  has_many :activities, serializer: ActivitySerializer
end
