class CategoriesController < ApplicationController
  # before_action :set_category, only: [:show, :update, :destroy]

  def index
    categories = Category.all
    render json: categories.to_json(except: [:created_at, :updated_at], :include => {:events => {except: [:created_at, :updated_at], methods: :category_name
    }})
  end

  def show
    category = Category.find(params[:id])
    render json: category, except: [:created_at, :updated_at], :include => {:events => {
      :include => :category, except: [:created_at, :updated_at]
    }}
  end

  # # POST /categories
  # def create
  #   @category = Category.new(category_params)

  #   if @category.save
  #     render json: @category, status: :created, location: @category
  #   else
  #     render json: @category.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /categories/1
  # def update
  #   if @category.update(category_params)
  #     render json: @category
  #   else
  #     render json: @category.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /categories/1
  # def destroy
  #   @category.destroy
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_category
  #     @category = Category.find(params[:id])
  #   end

  #   # Only allow a trusted parameter "white list" through.
  #   def category_params
  #     params.require(:category).permit(:name)
  #   end
end
