const {Schema, model, Types} = require('mongoose')
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => {
      return new Types.ObjectId()
    } 
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: [{
    type: String,
    required: true
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    get: Date.now
    //Use a getter method to format the timestamp on query
  }
},{
  toJSON: {
    getters:true
  },
  id: false
})
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now
    //Use a getter method to format the timestamp on query
  },
  username: [{
    type: String,
    required: true
  }],
  reactions: [reactionSchema]
},{
  toJSON: {
    virtuals: true,
  },
  id: false
})
thoughtSchema.virtual("reactionsCount").get(() => {
  if(this.reactions) {
    return this.reactions.length
  }else{
    return 0
  }
})
const Thought = model("Thought", thoughtSchema)
module.exports = Thought