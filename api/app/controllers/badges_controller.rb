class BadgesController < ApplicationController

  def create
    @badge = Badge.new(badge_params)
    # @badge.assign_attributes(@json['title'], @json['teacher_id'])

    if @badge.save
      @teacher = Teacher.find(@badge.teacher_id)
      render json: {name: @teacher.name, badges: @teacher.badges}
    else
      render json: @badge.errors, status: :unprocessable_entity
    end
  end

  def vote
    @badge = Badge.find(params[:id])

    if params[:vote_type] == "up"
      @badge.increment!(:votes, by = 1)
    elsif params[:vote_type] == "down"
      @badge.decrement!(:votes, by = 1)
    end

    if @badge.save
      @teacher = Teacher.find(@badge.teacher_id)
      render json: {name: @teacher.name, badges: @teacher.badges}
    else
      render json: @badge.errors, status: :unprocessable_entity
    end
  end

  private

    def badge_params
      params.permit(:title, :teacher_id)
    end

end
