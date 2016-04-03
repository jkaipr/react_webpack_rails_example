class ApiController < ActionController::API
  include API::ErrorSerializer
  # protect_from_forgery not available by default in ActionController::API
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :null_session
  rescue_from Exception, with: :render_error
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::RoutingError, with: :render_not_found

  def raise_not_found
    raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
  end

  private

  def render_error(exception)
    render_exception exception, 500, { message: 'Internal server error.' }
  end

  def record_not_found(exception)
    render_exception exception, request.get? ? 404 : 400, { message: 'Record not found.' }
  end

  def render_not_found(exception)
    render_exception exception, 404, { message: 'Not found.' }
  end

  def render_not_authenticated(exception)
    render_exception exception, 403, { message: 'Not authenticated.' }
  end

  def render_exception(exception, status, json)
    Rails.logger.error exception.message
    Rails.logger.error exception.backtrace.join("\n")

    render json: json, status: status
  end

end
