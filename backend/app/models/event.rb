class Event < ApplicationRecord
  belongs_to :organisation
  has_many :tickets, dependent: :destroy
  has_many :students, through: :tickets

  validates :organisation_id, presence: true
end
