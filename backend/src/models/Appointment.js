import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    dateTime: { type: Date, required: true },
    reason: { type: String, trim: true },
    status: {
      type: String,
      enum: ["scheduled", "canceled", "completed"],
      default: "scheduled",
    },
    address: {
      cep: String,
      street: String,
      neighborhood: String,
      city: String,
      state: String,
    },
    weather: {
      hasRainForecast: Boolean,
      summary: String,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
