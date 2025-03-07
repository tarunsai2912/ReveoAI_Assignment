const { google } = require("googleapis");
const Column = require("../models/Column");
const dotenv = require("dotenv");
const path = require("path"); 

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME;

const getSheetData = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../credentials.json"),
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });

    res.json(response.data.values);
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" });
  }
};

const addColumn = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id;

  try {
    let column = await Column.findOne({ userId });
    if (!column) {
      column = new Column({ userId, columns: [] });
    }

    column.columns.push({ name, type });
    await column.save();

    res.json(column);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getSheetData, addColumn };