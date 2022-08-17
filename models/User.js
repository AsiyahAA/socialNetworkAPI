const {Schema, model} = require('mongoose')
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "email is not valid"]
  },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: "Thought"
  }]
},{
  toJSON: {
    virtuals: true,
  },
  id: false
})
userSchema.virtual("friendCount").get(() => {
  if(this.friends) {
    return this.friends.length
  }else{
    return 0
  }
})
const User = model("User", userSchema)
module.exports = User