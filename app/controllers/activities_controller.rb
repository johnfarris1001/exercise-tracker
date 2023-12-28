class ActivitiesController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        activity = Activity.create!(activity_params.merge!({'user_id': current_user.id}).merge!({'start_time': params[:start_time].to_datetime}))
        render json: activity, status: :created
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def activity_params
        params.permit(:category, :duration, :instructor_id, :location_id, :intensity)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
