const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    route: {
      type: String,
      required: ["true", "Route must be provided!"],
    },
    query: {
      type: mongoose.Schema.Types.Mixed,
      required: ["true", "Request query must be provided!"],
    },
    ip: {
      type: String,
      required: ["true", "IP address must be provided!"],
    },
    success: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
