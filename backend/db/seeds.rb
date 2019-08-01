# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Student.create(first_name: "Lizzie", last_name: "Bennet", email: "lb@hotmail.com", year: 3, major: "English", password: "password", password_confirmation: "password")
Organisation.create(name: "Cult", description: "We are a cult.", email: "cult@cult.com", password: "password", password_confirmation: "password")
Organisation.create(name: "Rich bank", description: "We are a bank with a lot of money and a lot of internship opportunities.", email: "contact@richbank.com", password: "password", password_confirmation: "password")
Event.create(title: "Reunion", location:"bloodcells", start: "2019-07-24T19:04:29.442", end:"2019-07-24T19:05:29.442", dress_code: "N/A", speakers:"John Smith", contact_email: "cult@cult.com", category_id: 3, tags:"fun", organisation_id: 1, notes: "N/A")
Event.create(title: "Company presentation", location: "rooftop bar", start:"2019-07-24T19:04:29.442", end:"2019-07-24T19:05:29.442", dress_code: "business formal", speakers: "CEO", contact_email: "contact@richbank.com", category_id: 6, tags: "informational", organisation_id: 2, notes: "N/A")
# Ticket.create(event_id: 1, student_id: 1)
# Ticket.create(event_id: 2, student_id: 1)

["Charity", "Community and culture", "Education", "Film, Media and Entertainment", "Health and Wellbeing", "Networking and Company Presentations", "Other", "Public Lecture", "Science and Technology"].each do |category|
    Category.create({:name => category})
end

major = ["Biology", "Business Administration", "Communications", "Computer Science", "Criminal Justice", "Education", "Marketing", "Nursing", "Political Science"]

30.times do
    Student.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, year: rand(1..4), major: ["Biology", "Business Administration", "Communications", "Computer Science", "Criminal Justice", "Education", "Marketing", "Nursing", "Political Science"].sample, password: "password", password_confirmation:"password")
end

5.times do
    Organisation.create(name: Faker::Company.name, description: Faker::Company.bs, email: Faker::TvShows::TheITCrowd.email, password: "password", password_confirmation:"password")
end

30.times do 
    Event.create(title: Faker::Space.meteorite, location: Faker::Address.full_address, start: Faker::Time.forward(days: 7), end: Faker::Time.forward(days: 7), dress_code: "N/A", speakers: Faker::Name.name, contact_email: Faker::TvShows::TheITCrowd.email, category_id: rand(1..18), tags: "N/A", organisation_id: rand(1..7), notes: Faker::Quotes::Shakespeare.romeo_and_juliet_quote)
end

[*1..30].each do |num|
    Ticket.create(event_id: 1, student_id: num)
end

