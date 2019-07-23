class OrganisationsController < ApplicationController
  # before_action :set_organisation, only: [:show, :update, :destroy]
  


  def login
    org = Organisation.find_by(email:params[:email])
    if org
      render json: org
    else
      render json: {error: "LOG IN UNSUCCESSFUL", status: 401}
    end
  end


  def index
    organisations = Organisation.all
    render json: organisations
  end

  def show
    organisation = Organisation.find(params[:id])
    render json: organisation
  end

  def create
    organisation = Organisation.new(organisation_params)
    if organisation.save
      render json: organisation
    else
      render json: {"error": "cannot create organisation"}
    end
  end

  def update
    organisation = Organisation.find(params[:id])
    if organisation.update(organisation_params)
      render json: organisation
    else
      render json: {"error": "update unsuccessful"}
    end
  end

  def destroy
    organisation = Organisation.find(params[:id])
    organisation.destroy
  end

  private

  def organisation_params
    params.require(:organisation).permit(:email, :name, :description)
  end



end
