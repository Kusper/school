import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";

import * as db from "./db.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const allowedPages = ["index", "advertisement", "gallery", "our_teachers", "about_us", "adminPanel"];

///////////////////////////////////////

const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "../public"));
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

///////////////////////////////////////
///           API requests          ///
///////////////////////////////////////

app.get("/api/gallery", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 4;

        res.json(await db.getPhotos(limit, offset));
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

app.get("/api/schedule", async (req, res) => {
    try {
        res.json(await db.getSchedule());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

app.get("/api/our_teachers", async (req, res) => {
    try {
        res.json(await db.getOurTeachers());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

app.get("/api/advertisement", async (req, res) => {
    try {
        res.json(await db.getAdvertisement());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

///////////////////////////////////////
///       Dynamic page routing      ///
///////////////////////////////////////
app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../public/html/${page}.html`);

    if (allowedPages.includes(page) && fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.redirect("/");
    }
});

app.listen(PORT, () => {
    console.log(`[server.mjs] Running on http://localhost:${PORT}\n`);
});
