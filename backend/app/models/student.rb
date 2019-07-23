class Student < ApplicationRecord
    has_many :events
    has_many :organisations, through: :events
end
