class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :activities
    has_many :instructors, through: :activities
    has_many :locations, through: :activities
    has_one :profile, dependent: :destroy

    def unique_locations
        self.locations.uniq
    end

    def unique_instructors
        self.instructors.uniq
    end
end
