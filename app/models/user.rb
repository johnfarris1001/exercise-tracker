class User < ApplicationRecord

    has_many :activities
    has_many :instructors, through: :activities
    has_many :locations, through: :activities
    has_one :profile
end
