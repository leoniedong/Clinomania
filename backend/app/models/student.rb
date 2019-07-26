class Student < ApplicationRecord
    has_many :tickets
    has_many :events, through: :tickets
    has_many :organisations, through: :events

    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
end
