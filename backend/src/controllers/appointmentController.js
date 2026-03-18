import Appointment from "../models/Appointment.js";
import { lookupCep } from "../services/cepService.js";
import { getRainForecastForDay } from "../services/weatherService.js";

export async function listAppointments(req, res, next) {
  try {
    const query = {};
    if (req.user.role === "patient") {
      query.patient = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "name email")
      .sort({ dateTime: 1 });

    res.json({ appointments });
  } catch (err) {
    next(err);
  }
}

export async function createAppointment(req, res, next) {
  try {
    const { dateTime, reason, cep } = req.body;
    if (!dateTime || !cep) {
      return res.status(400).json({ error: "Data/hora e CEP são obrigatórios" });
    }

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({ error: "Data/hora inválida" });
    }

    const existing = await Appointment.findOne({ dateTime: date });
    if (existing) {
      return res.status(409).json({ error: "Horário já agendado" });
    }

    const address = await lookupCep(cep);
    const weather = await getRainForecastForDay(address.city, date);

    const appointment = await Appointment.create({
      patient: req.user._id,
      dateTime: date,
      reason,
      address: { cep: address.cep, street: address.street, neighborhood: address.neighborhood, city: address.city, state: address.state },
      weather: { hasRainForecast: weather.hasRain, summary: weather.summary },
    });

    res.status(201).json({ appointment });
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["scheduled", "canceled", "completed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: "Status inválido" });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ appointment });
  } catch (err) {
    next(err);
  }
}
