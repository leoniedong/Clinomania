class Organisation < ApplicationRecord
    has_many :events, dependent: :destroy
    has_many :tickets, through: :events
    has_many :students, through: :events

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
    validates :password_digest, presence: true

    has_secure_password
end
