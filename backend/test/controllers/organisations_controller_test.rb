require 'test_helper'

class OrganisationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @organisation = organisations(:one)
  end

  test "should get index" do
    get organisations_url, as: :json
    assert_response :success
  end

  test "should create organisation" do
    assert_difference('Organisation.count') do
      post organisations_url, params: { organisation: { description: @organisation.description, email: @organisation.email, name: @organisation.name } }, as: :json
    end

    assert_response 201
  end

  test "should show organisation" do
    get organisation_url(@organisation), as: :json
    assert_response :success
  end

  test "should update organisation" do
    patch organisation_url(@organisation), params: { organisation: { description: @organisation.description, email: @organisation.email, name: @organisation.name } }, as: :json
    assert_response 200
  end

  test "should destroy organisation" do
    assert_difference('Organisation.count', -1) do
      delete organisation_url(@organisation), as: :json
    end

    assert_response 204
  end
end
