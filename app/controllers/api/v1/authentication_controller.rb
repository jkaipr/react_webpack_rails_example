class API::V1::AuthenticationController < ApiController
  before_action :authenticate_by_password!, only: :create
  before_action :authenticate, only: :refresh

  def create
    token = auth_token_initial.token
    render json: { jwt: token }, status: :created
  end

  def refresh
    token = auth_token_refresh(current_user).token
    render json: { jwt: token }, status: :ok
  end

  private

  def authenticate_by_password!
    if user.present?
      logged = user.authenticate(auth_params[:password])
      if !logged
        render_api_error('wrong-password', 'Wrong password', :bad_request)
      else
        logged
      end
    end
  rescue ActiveRecord::RecordNotFound
    render_api_error('unregistered', 'User not found', :bad_request)
  end

  def auth_params
    params.require(:auth).permit Knock.handle_attr, :password
  end

  def auth_token_initial
    Knock::AuthToken.new payload: payload(user)
  end

  def auth_token_refresh(user)
    Knock::AuthToken.new payload: payload(user)
  end

  def payload(user)
    { sub: user.id, email: user.email, admin: user.is_admin }
  end

  def user
    Knock.current_user_from_handle.call auth_params[Knock.handle_attr]
  end

  def user_params
    params.permit(:email, :password, :firstname, :lastname, :role)
  end

end
