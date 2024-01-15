class Instructor < ApplicationRecord
    validates :name, presence: true
    validates :years, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 50 }

    has_many :activities
    has_many :users, through: :activities
    has_many :locations, through: :activities

    def unique_users
        self.users.uniq
    end

    def unique_locations
        self.locations.order(:name).uniq
    end
end
