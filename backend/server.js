const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sheetRoutes = require("./routes/sheetRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Reveo AI')
})

app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);

mongoose.connect(process.env.MONGO_URI) 

mongoose.connection.on('connected', () => {
    console.log('MongoDb is connected...');
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});