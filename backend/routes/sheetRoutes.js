const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getSheetData, addColumn } = require("../controllers/sheetController");

const router = express.Router();

router.get("/sheet-data", authMiddleware, getSheetData);
router.post("/add-column", authMiddleware, addColumn);

module.exports = router;