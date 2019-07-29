# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Student.create(first_name: "Lizzie", last_name: "Bennet", email: "lb@hotmail.com", year: 3, major: "English")
Organisation.create(name: "Cult", description: "We are a cult.", email: "cult@cult.com")
Event.create(title: "Reunion", location:"bloodcells", start: "2019-07-24T19:04:29.442", end:"2019-07-24T19:05:29.442", dress_code: "N/A", speakers:"John Smith", contact_email: "cult@cult.com", category:"education", tags:"fun", organisation_id: 1)
Ticket.create()