const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  userIdentifier: {
    type: String,
    required: true
  }
});

likeSchema.index({ blogId: 1, userIdentifier: 1 }, { unique: true });

likeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Like", likeSchema);
