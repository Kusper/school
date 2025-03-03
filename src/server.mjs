import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import * as db from "./db.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const allowedPages = ["index", "advertisement"] // add a new page if needed

////////////////////////////////////////////////////////////

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});



app.get("/api/gallery", async (req, res) => {
    try {
        res.json(await db.getPhotos());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})


app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../public/html/${page}.html`);

    // Check if the page exists in the allowed list and the file exists
    if (allowedPages.includes(page) && fs.existsSync(filePath)) res.sendFile(filePath);
    else res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`); 
}); 