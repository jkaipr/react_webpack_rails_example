class API::V1::TicketsController < ApiController

  before_action :find_ticket, only: [:show, :update, :destroy]

  def index
    @tickets = Ticket.all
    render json: @tickets
  end

  def create
    @ticket = Ticket.new ticket_params

    if @ticket.save
      render json: { ok: true }
    else
      render json: serialize_errors(@ticket.errors), status: :bad_request
    end
  end

  def show
    render json: @ticket
  end

  def update
    if @ticket.update(ticket_params)
      render json: { ok: true }
    else
      render json: serialize_errors(@ticket.errors), status: :bad_request
    end
  end

  def destroy
    if @ticket.destroy
      render json: { ok: true }
    else
      render json: serialize(@ticket.errors), status: :bad_request
    end
  end

  private

  def find_ticket
    @ticket = Ticket.find params[:id]
  end

  def ticket_params
    params.permit(:user_id, :subject, :description, :state)
  end
end