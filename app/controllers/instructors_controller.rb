class InstructorsController < ApplicationController
    wrap_parameters format: []

    def index
        instructors = Instructor.all
        render json: instructors
    end
end
