class ActivitiesController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def destroy
        activity = current_user.activities.find_by(id: params[:id])
        if activity
            activity.destroy
            head :no_content
        end
    end

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

    def render_not_found_response
        render json: { error: "Activity not found" }, status: :not_found
    end
end
