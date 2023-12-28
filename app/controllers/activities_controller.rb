class ActivitiesController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        activity = Activity.create!(activity_params.merge!({'user_id': current_user.id}))
        render json: activity, status: :created
    end

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def activity_params
        params.permit(:category, :start_date, :duration, :instructor_id, :location_id, :intensity)
    end
end
