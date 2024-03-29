class OrganisationsController < ApplicationController
  # before_action :set_organisation, only: [:show, :update, :destroy]
  # has_secure_password


  def login
    org = Organisation.find_by(email:params[:email])
    # byebug
    if org && org.authenticate(params[:password])
      render json: org
    else
      render json: {error: "LOG IN UNSUCCESSFUL", status: 401}
    end
  end


  def index
    organisations = Organisation.all
    render json: organisations, include: [:events => {methods: :category_name}], except: [:created_at, :updated_at]
  end

  def show
    organisation = Organisation.find(params[:id])
    render json: organisation, include: [:events => {methods: :category_name}], except: [:created_at, :updated_at]
  end

  def create
    organisation = Organisation.new(organisation_params)
    # byebug
    if organisation.save
      render json: organisation, include: [:events], except: [:created_at, :updated_at]
    else
      # byebug
      render json: {"error": organisation.errors.full_messages}
    end
  end

  def update
    organisation = Organisation.find(params[:id])
    if organisation.update(organisation_params)
      render json: organisation, include: [:events], except: [:created_at, :updated_at]
    else
      render json: {"error": organisation.errors.full_messages}
    end
  end

  def destroy
    organisation = Organisation.find(params[:id])
    organisation.destroy
    render json: { msg: "Successfully destroyed" }, status: :ok
  end

  private

  def organisation_params
    params.permit(:email, :name, :description, :password, :password_confirmation)
  end



end
