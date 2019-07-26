class EventsController < ApplicationController
  # before_action :set_event, only: [:show, :update, :destroy]

  def index
    events = Event.all
    render json: events.to_json(include: [:organisation, :students])
  end

  def show
    event = Event.find(params[:id])
    render json: event, include: [:organisation, :students]
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, include: [:organisation, :students]
    else
      render json: { error: event.errors.full_messages }
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event, include: [:organisation, :students]
    else
      render json: { error: event.errors.full_messages }
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
  end

  private

    def event_params
      params.require(:event).permit(:title, :date, :location, :dress_code, :organisation_id, :speakers, :contact_email, :category, :tags)
    end
    
end
