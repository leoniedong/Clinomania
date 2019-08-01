class Student < ApplicationRecord
    has_many :tickets, dependent: :destroy
    has_many :events, through: :tickets
    has_many :organisations, through: :events

    validates :email, presence: true, uniqueness: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password_digest, presence: true

    has_secure_password
end
