class LocationsController < ApplicationController
    wrap_parameters format: []

    def index
        locations = Location.all
        render json: locations
    end
end
