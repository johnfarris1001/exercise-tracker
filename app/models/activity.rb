class Activity < ApplicationRecord
  validates :intensity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }
  validates :user_rating, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :duration, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 360 }
  validate :activity_is_in_past
  validate :start_time_is_a_date
  validate :does_not_overlap

  belongs_to :user
  belongs_to :instructor
  belongs_to :location

  private

  def activity_is_in_past
    if (start_time + (duration * 60)) > DateTime.now
      errors.add(:duration, "of activity must be in past.")
    end
  end

  def start_time_is_a_date
    if start_time.present?
      unless start_time.is_a?(Time)
        errors.add(:start_time, "Is not a valid date.")
      end
    end
  end

  def does_not_overlap
    activities = User.find_by(id: user_id).activities
    activities.each {|act| errors.add(:overlap!, "Activities must not overlap.") unless act.id == id || (start_time + (duration * 60)) < act.start_time || start_time > (act.start_time + (act.duration * 60))}
  end
end
