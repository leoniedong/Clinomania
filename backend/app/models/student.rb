class Student < ApplicationRecord
    has_many :tickets
    has_many :events, through: :tickets
    has_many :organisations, through: :events
end
