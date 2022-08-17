const seedUsers = require('./user-seeds');
const User = require('../models/User')
const Thought = require ('../models/Thought')
const seedThoughts = require('./thought-seeds');

const db = require('../config/connection');

const seedAll = async () => {
db.once("open", async () => { 
  // await db.collection("user").drop()
  // await db.collection("thought").drop()

  User.insertMany(seedUsers, () => {
    console.log("User successfully seeded")
    
  Thought.insertMany(seedThoughts, () => {
    console.log("Thoughts successfully seeded")
  
    process.exit(0);
  
    })
  })
})

};

seedAll();