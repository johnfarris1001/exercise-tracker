class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :category, :intensity, :start_time, :duration, :user_rating
  has_one :user
  has_one :instructor
  has_one :location
end
