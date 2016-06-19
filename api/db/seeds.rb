# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Teacher.create(name: 'Derek', votes: 0)
Teacher.create(name: 'Hunter', votes: 0)
Teacher.create(name: 'Jaclyn', votes: 0)
Teacher.create(name: 'Julian', votes: 0)
Teacher.create(name: 'Mihai', votes: 0)
Teacher.create(name: 'Seba', votes: 0)
Teacher.create(name: 'Shambhavi', votes: 0)
Teacher.create(name: 'Walker', votes: 0)

40.times do
  Badge.create(title: 'Most likely to ' + Faker::Superhero.power, teacher_id: rand(1..8))
end
