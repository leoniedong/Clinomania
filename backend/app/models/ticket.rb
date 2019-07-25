class Ticket < ApplicationRecord
  belongs_to :student
  belongs_to :event
end
