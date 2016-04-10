class API::V1::TicketsController < ApiController
  before_action :require_user, only: [:create, :update, :destroy]
  before_action :find_ticket, only: [:show, :update, :destroy]
  before_action :require_ticket_author, only: [:update, :destroy]

  def index
    @tickets = Ticket.all
    render formats: :json
  end

  def create
    @ticket = Ticket.new ticket_params
    @ticket.user_id = current_user.id

    if @ticket.save
      render 'show', formats: :json
    else
      render_error
    end
  end

  def show
    render formats: :json
  end

  def update
    if @ticket.update ticket_params
      render 'show', formats: :json
    else
      render_error
    end
  end

  def destroy
    if @ticket.destroy
      render_ok({ id: params[:id] })
    else
      render_error
    end
  end

  private

  def find_ticket
    @ticket = Ticket.find params[:id]
  end

  def render_ok(payload = {})
    render json: payload.merge({ ok: true })
  end

  def render_error
    render json: serialize_errors(@ticket.errors), status: :bad_request
  end

  def require_ticket_author
    if current_user.id != @ticket.user_id
      raise_not_authorized('User is not ticket author.') unless current_user.is_admin
    end
  end

  def ticket_params
    params.permit(:user_id, :subject, :description, :state)
  end

end