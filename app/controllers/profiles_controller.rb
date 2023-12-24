class ProfilesController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def update
        profile = current_user.profile
        if profile
            profile.update!(profile_params)
            render json: profile, status: :accepted
        else
            render json: { error: 'You have not yet created your profile' }, status: :not_found
        end
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def profile_params
        params.permit(:name, :image, :bio, :height, :weight)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
