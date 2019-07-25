class StudentsController < ApplicationController
  # before_action :set_student, only: [:show, :update, :destroy]


  def login
    student = Student.find_by(email:params[:email])
    if student
      render json: student, :include => {:tickets => {:include => :event}}
    else
      render json: {error: "LOG IN UNSUCCESSFUL", status: 401}
    end
  end
  


  def index
    students = Student.all
    render json: students, :include => {:tickets => {:include => :event}}
  end

  def show
    student = Student.find(params[:id])
    render json: student, :include => {:tickets => {:include => :event}}
  end

  def create
    student = Student.new(student_params)

    if student.save
      render json: student, :include => {:tickets => {:include => :event}}
    else
      render json: {"error": "Cannot create student"}, status: 406
    end
  end

  def update
    student = Student.find(params[:id])
    if student.update(student_params)
      render json: student, :include => {:tickets => {:include => :event}}
    else
      render json: student.errors, status: :unprocessable_entity
    end
  end

  def destroy
    student = Student.find(params[:id])
    student.destroy
  end

  # def name
  #   self.first_name + " " + self.last_name
  # end

  private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_student
  #     @student = Student.find(params[:id])
  #   end

    def student_params
      params.require(:student).permit(:email, :year, :major, :first_name, :last_name)
    end
end
