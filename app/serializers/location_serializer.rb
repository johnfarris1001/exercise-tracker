class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :description
end
