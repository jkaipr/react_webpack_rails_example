class API::V1::CommentsController < ApiController
  before_action :require_user, only: :create

  def index
    @comments = Comment.where(ticket_id: comment_params[:ticket_id]).all
    render formats: :json
  end

  def create
    @comment = Comment.new comment_params

    if @comment.save
      render json: { ok: true }
    else
      render json: serialize_errors(@comment.errors), status: :bad_request
    end
  end

  private

  def comment_params
    params.permit(:text, :user_id, :ticket_id)
  end
end
