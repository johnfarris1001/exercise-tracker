class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :bio, :height, :weight
  has_one :user
end
