class Event < ApplicationRecord
  belongs_to :organisation
  has_many :tickets
  has_many :students, through: :tickets
end
