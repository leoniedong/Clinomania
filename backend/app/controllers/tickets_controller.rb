class TicketsController < ApplicationController
  # before_action :set_ticket, only: [:show, :update, :destroy]

  # GET /tickets
  def index
    tickets = Ticket.all
    render json: tickets.to_json(include: [:event, :student], except: [:created_at, :updated_at])
  end

  # GET /tickets/1
  def show
    ticket = Ticket.find(params[:id])
    render json: ticket, include: [:event, :student], except: [:created_at, :updated_at]
  end

  # POST /tickets
  def create
    ticket = Ticket.new(ticket_params)

    if ticket.save
      render json: ticket, include: [:event, :student], except: [:created_at, :updated_at]
    else
      render json: ticket.errors
    end
  end

  # PATCH/PUT /tickets/1
  def update
    ticket = Ticket.find(params[:id])
    if ticket.update(ticket_params)
      render json: ticket, include: [:event, :student], except: [:created_at, :updated_at]
    else
      render json: ticket.errors
    end
  end

  # DELETE /tickets/1
  def destroy
    ticket = Ticket.find(params[:id])
    ticket.destroy
    render json: { msg: "Successfully destroyed" }, status: :ok
  end

  private
    def ticket_params
      params.require(:ticket).permit(:student_id, :event_id)
    end
end
