import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageOrVideo: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
