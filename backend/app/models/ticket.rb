class Ticket < ApplicationRecord
  belongs_to :student
  belongs_to :event

  validates :student_id, presence: true
  validates :event_id, presence: true
end
