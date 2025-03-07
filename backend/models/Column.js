const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  columns: [
    {
      name: { type: String, required: true },
      type: { type: String, enum: ["text", "date"], default: "text" },
    },
  ],
});

module.exports = mongoose.model("Column", ColumnSchema);