import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

app.get("/advertisement", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/advertisement.html"));
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`); 
}); 