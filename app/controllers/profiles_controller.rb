class ProfilesController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        profile = Profile.create!(profile_params.merge!({'user_id': current_user.id}))
        render json: profile, status: :created
    end

    def update
        profile = current_user.profile
        if profile
            profile.update!(profile_params)
            render json: profile, status: :accepted
        else
            render json: { error: 'You have not yet created your profile' }, status: :not_found
        end
    end

    def destroy
        profile = current_user.profile
        if profile
            profile.destroy
            head :no_content
        else
            render json: { error: "Profile not found" }, status: :not_found
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
