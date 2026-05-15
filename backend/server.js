require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const app = express();
app.use(cors({
  origin: "https://national-solar-system.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Helper function to access a Google Sheet
async function accessSheet(sheetId) {
  const doc = new GoogleSpreadsheet(sheetId);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  });

  await doc.loadInfo();
  return doc;
}

// --- Calculator Submission Route ---
app.post('/api/calculator', async (req, res) => {
  try {
    const doc = await accessSheet(process.env.CALCULATOR_SHEET_ID);
    const sheet = doc.sheetsByIndex[0];

    const { unitsUsed, billAmount, roofSize, roofType } = req.body;

    // --- 🔢 CALCULATIONS ---
    const COST_PER_KW = 60000;
    const PANEL_WATTAGE = 550;
    const PANEL_SIZE_SQFT = 28;

    const systemSize_kW = unitsUsed / 120;
    const panelsRequired = Math.ceil((systemSize_kW * 1000) / PANEL_WATTAGE);
    const roofAreaRequired = panelsRequired * PANEL_SIZE_SQFT;

    // Optional: roof validation
    if (roofAreaRequired > roofSize) {
      return res.status(400).json({
        message: `Not enough roof space! Need ~${Math.ceil(roofAreaRequired)} sq.ft`
      });
    }

    const systemAmount = Math.round(systemSize_kW * COST_PER_KW);
    const roiYears = (systemAmount / (billAmount * 12)).toFixed(1);
    const annualSaving = Math.round(billAmount * 12);

    // --- 📄 SAVE TO SHEET ---
    await sheet.addRow({
      UnitsUsed: unitsUsed,
      BillAmount: billAmount,
      RoofSize: roofSize,
      RoofType: roofType,
      SystemSize: `${systemSize_kW.toFixed(2)} kW`,
      Investment: `₹${systemAmount.toLocaleString("en-IN")}`,
      ROI: `${roiYears} years`,
      Panels: panelsRequired,
      Saving: `₹${annualSaving.toLocaleString("en-IN")}`,
      SubmittedAt: new Date().toLocaleString(),
    });

    res.status(201).json({
      message: 'Calculator data saved successfully',
      results: {
        systemSize: systemSize_kW,
        investment: systemAmount,
        roi: roiYears,
        panels: panelsRequired,
        saving: annualSaving
      }
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Contact Form Submission Route ---
app.post('/api/contact', async (req, res) => {
  try {
    const doc = await accessSheet(process.env.CONTACT_SHEET_ID);
    const sheet = doc.sheetsByIndex[0];

    const { name, email, phone, consumerNumber, query } = req.body;

    if (!name || !email || !phone || !consumerNumber || !query) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await sheet.addRow({
      Name: name,
      Phone: phone,
      Email: email,
      ConsumerNumber: consumerNumber,
      Query: query,
      SubmittedAt: new Date().toLocaleString(),
    });

    res.status(201).json({ message: "Contact form submitted successfully" });

  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Test route ---
app.get('/', (req, res) => res.send('Backend is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));