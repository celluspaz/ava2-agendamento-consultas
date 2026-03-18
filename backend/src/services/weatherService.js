import axios from "axios";

const OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5/forecast";

export async function getRainForecastForDay(city, date) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return { hasRain: false, summary: "Chave de API de clima não configurada" };
  }

  const dateStr = date.toISOString().slice(0, 10);
  const params = {
    q: city,
    appid: apiKey,
    units: "metric",
    lang: "pt",
  };

  const resp = await axios.get(OPENWEATHER_BASE, { params, timeout: 8000 });
  const list = Array.isArray(resp.data.list) ? resp.data.list : [];

  const dayItems = list.filter((item) => item.dt_txt.startsWith(dateStr));
  const hasRain = dayItems.some((item) => {
    const main = item.weather?.[0]?.main?.toLowerCase() ?? "";
    return main.includes("rain") || main.includes("thunderstorm") || main.includes("drizzle");
  });

  const summary = dayItems.length
    ? dayItems[0].weather?.[0]?.description || ""
    : "Sem dados de previsão para o dia";

  return { hasRain, summary };
}
