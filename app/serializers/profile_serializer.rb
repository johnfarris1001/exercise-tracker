class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :string, :bio, :height, :weight
  has_one :user
end
