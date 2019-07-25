class Organisation < ApplicationRecord
    has_many :events
    has_many :tickets, through: :events
    has_many :students, through: :events
end
