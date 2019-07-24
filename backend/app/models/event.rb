class Event < ApplicationRecord
  belongs_to :student, required: false
  belongs_to :organisation
end
