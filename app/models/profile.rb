class Profile < ApplicationRecord
  validates :name, presence: true
  validates :height, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than: 100 }
  validates :weight, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :bio, presence: true, length: { maximum: 500 }

  belongs_to :user
end
