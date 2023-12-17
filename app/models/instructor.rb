class Instructor < ApplicationRecord
    validates :name, presence: true
    validates :years, presence: true, numericality: { only_integer: true }

    has_many :activities
    has_many :users, through: :activities
end
