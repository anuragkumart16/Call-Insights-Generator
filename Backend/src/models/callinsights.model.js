import mongoose, { Schema } from "mongoose";

const CallInsightSchema = new Schema(
    {
      customerId: {
        type: String,
        required: true,
        trim: true,
      },
      agentId: {
        type: String,
        required: true,
        trim: true,
      },
      audioLink:{
        type: String,
        required: true,
        trim: true,
      },
      audioTranscript: {
        type: String,
        required: true,
        trim: true,
      },
      callInsight: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        trim: true,
      },
     
    },
    { timestamps: true }
  );
  

  export const CallInsight = mongoose.model("CallInsight", CallInsightSchema);