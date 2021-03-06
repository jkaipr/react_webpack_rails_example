class ApiController < ActionController::API
  include API::ErrorSerializer

  # protect_from_forgery not available by default in ActionController::API
  include ActionController::RequestForgeryProtection
  # JWT token authentication
  include Knock::Authenticable

  respond_to :json
  protect_from_forgery with: :null_session
  skip_before_filter :verify_authenticity_token
  rescue_from Exception, with: :render_error
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::RoutingError, with: :render_not_found
  rescue_from AuthenticationError, with: :render_not_authenticated

  def raise_not_authenticated(message = nil)
    raise AuthenticationError.new(message)
  end

  def raise_not_authorized(message = nil)
    raise AuthorizationError.new(message)
  end

  def raise_not_found
    raise ActionController::RoutingError.new("No route matches #{params[:unmatched_route]}")
  end

  def require_admin
    raise_not_authorized('User does not have admin rights.') unless current_user.is_admin
  end

  def require_user
    raise_not_authenticated('User not authenticated.') unless current_user
  end

  private

  def render_api_error(code, title, status)
    render json: { errors: [{ code: code, title: title }] },
           status: status
  end

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
