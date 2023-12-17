class Location < ApplicationRecord
    validates :name, presence: true
    validates :description, presence: true

    has_many :activities
    has_many :users, through: :activities
end
