class EventsController < ApplicationController
  # before_action :set_event, only: [:show, :update, :destroy]

  def index
    events = Event.all
    render json: events
  end

  def show
    event = Event.find(params[:id])
    render json: @event
  end

  def create
    event = Event.find(params[:id])
    event = Event.new(event_params)

    if event.save
      render json: event, status: :created, location: @event
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event
    else
      render json: event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
  end

  private
    def event_params
      params.require(:event).permit(:title, :date, :location, :dress_code, :student_id, :organisation_id)
    end
end
