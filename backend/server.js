const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const app = express();

// ---------------- CORS CONFIG ----------------
const allowedOrigins = [
  "https://solar-internship-website.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4173"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests without origin (curl, server-to-server, health checkers)
    if (!origin) return callback(null, true);

    // allow localhost and 127.0.0.1 on any port in development
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    // allow explicit production origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // allow ALL vercel preview deployments
    if (origin.endsWith(".vercel.app") || origin.includes("vercel.app")) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(null, false);
  },

  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ---------------- GOOGLE SHEETS ----------------
async function accessSheet(sheetId) {
  if (!sheetId) {
    throw new Error("Spreadsheet ID is missing in environment variables");
  }

  const clientEmail = process.env.CLIENT_EMAIL;
  const privateKey = (process.env.PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Google service account credentials (CLIENT_EMAIL / PRIVATE_KEY) are missing in environment variables");
  }

  const doc = new GoogleSpreadsheet(sheetId);

  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  });

  await doc.loadInfo();

  return doc;
}

// ---------------- CALCULATOR API ----------------
app.post("/api/calculator", async (req, res) => {
  try {
    const { unitsUsed, billAmount, roofSize, roofType } = req.body;

    const u = parseFloat(unitsUsed);
    const b = parseFloat(billAmount);
    const r = parseFloat(roofSize);

    if (isNaN(u) || u <= 0 || isNaN(b) || b <= 0 || isNaN(r) || r <= 0 || !roofType) {
      return res.status(400).json({
        message: "Please fill in all fields with positive numbers and select a roof type."
      });
    }

    const doc = await accessSheet(process.env.CALCULATOR_SHEET_ID);
    const sheet = doc.sheetsByIndex[0];

    const COST_PER_KW = 60000;
    const PANEL_WATTAGE = 550;
    const PANEL_SIZE_SQFT = 28;

    const systemSize_kW = u / 120;
    const panelsRequired = Math.ceil((systemSize_kW * 1000) / PANEL_WATTAGE);
    const roofAreaRequired = panelsRequired * PANEL_SIZE_SQFT;

    if (roofAreaRequired > r) {
      return res.status(400).json({
        message: `Not enough roof space! Need ~${Math.ceil(roofAreaRequired)} sq.ft`
      });
    }

    const systemAmount = Math.round(systemSize_kW * COST_PER_KW);
    const roiYears = (systemAmount / (b * 12)).toFixed(1);
    const annualSaving = Math.round(b * 12);

    await sheet.addRows([{
      UnitsUsed: u,
      BillAmount: b,
      RoofSize: r,
      RoofType: roofType,
      SystemSize: `${systemSize_kW.toFixed(2)} kW`,
      Investment: `\u20B9${systemAmount.toLocaleString("en-IN")}`,
      ROI: `${roiYears} years`,
      Panels: panelsRequired,
      Saving: `\u20B9${annualSaving.toLocaleString("en-IN")}`,
      SubmittedAt: new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata"
      }),
    }]);

    res.status(201).json({
      message: "Calculator data saved successfully",
      results: {
        systemSize: systemSize_kW,
        investment: systemAmount,
        roi: roiYears,
        panels: panelsRequired,
        saving: annualSaving
      }
    });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// ---------------- CONTACT API ----------------
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, consumerNumber, query } = req.body;

    if (!name || !email || !phone || !consumerNumber || !query) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const doc = await accessSheet(process.env.CONTACT_SHEET_ID);
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRows([{
      Name: name,
      Phone: phone,
      Email: email,
      ConsumerNumber: consumerNumber,
      Query: query,

      // INDIA TIME
      SubmittedAt: new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Kolkata"
      }),
    }]);

    res.status(201).json({
      message: "Contact form submitted successfully"
    });

  } catch (err) {
    console.error("FULL CONTACT ERROR:", err);

    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
});

// ---------------- HEALTH & TEST ROUTES ----------------
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "solar-calculator-backend",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
