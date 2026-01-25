import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, default: "Anonymous" },
  email: { type: String }, 
  
  // 🟢 NEW FIELDS
  liked: { type: String },       // "What they found best"
  disliked: { type: String },    // "What is bad"
  improvement: { type: String }, // "What can be improved"
  
  message: { type: String, required: true }, // The main compulsory message
  
  status: { 
    type: String, 
    enum: ['New', 'Read', 'Resolved'], 
    default: 'New' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);