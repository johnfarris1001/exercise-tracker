class Instructor < ApplicationRecord
    validates :name, presence: true
    validates :years, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 50 }

    has_many :activities
    has_many :users, through: :activities
end
