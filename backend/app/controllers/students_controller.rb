class StudentsController < ApplicationController
  # before_action :set_student, only: [:show, :update, :destroy]


  def login
    student = Student.find_by(email:params[:email])
    byebug
    if student && student.authenticate(params[:password])
      render json: student, :include => {:tickets => {:include => :event}}, except: [:created_at, :updated_at]
    else
      render json: {error: "LOG IN UNSUCCESSFUL", status: 401}
    end
  end
  


  def index
    students = Student.all
    render json: students, :include => {:tickets => {:include => :event}}, except: [:created_at, :updated_at]
  end

  def show
    student = Student.find(params[:id])
    render json: student, :include => {:tickets => {:include => :event}}, except: [:created_at, :updated_at]
  end

  def create
    student = Student.new(student_params)

    if student.save
      render json: student, :include => {:tickets => {:include => :event}}, except: [:created_at, :updated_at]
    else
      render json: {"error": student.errors.full_messages}, status: 406
    end
  end

  def update
    student = Student.find(params[:id])
    if student.update(student_params)
      render json: student, :include => {:tickets => {:include => :event}}, except: [:created_at, :updated_at]
    else
      render json: {"error": student.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    student = Student.find(params[:id])
    student.destroy
    render json: { msg: "Successfully destroyed" }, status: :ok
  end

  private
    def student_params
      params.permit(:email, :year, :major, :first_name, :last_name, :password, :password_confirmation)
    end

end
