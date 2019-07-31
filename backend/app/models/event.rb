class Event < ApplicationRecord
  belongs_to :organisation
  belongs_to :category
  has_many :tickets, dependent: :destroy
  has_many :students, through: :tickets

  validates :organisation_id, presence: true

  def category_name
    self.category.name
  end
end
