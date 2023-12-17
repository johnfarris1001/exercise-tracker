class LocationsController < ApplicationController
    wrap_parameters format: []

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        locations = Location.all
        render json: locations
    end

    def create
        location = Location.create!(location_params)
        render json: location, status: :created
    end

    private

    def location_params
        params.permit(:name, :address, :description)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
