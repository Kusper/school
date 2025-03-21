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
const allowedPages = ["index", "advertisement", "gallery", "our_teachers", "about_us"];

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

app.get("/api/our_teachers/:teacherID", async (req, res) => {
    const teacherID = req.params.teacherID;

    try{
        const result = await db.getOurTeachersByID(teacherID);
        
        if(!result)
            return res.status(404).json({message: `[server.mjs] Teacher with ID=${teacherID} not found`});
        return res.json(result);
    }
    catch(error) {
        console.error("[server.mjs] Error fetching teacher by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
})

app.get("/api/advertisements", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        res.json(await db.getAdvertisements(offset));
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

app.get("/api/advertisements/:adID", async (req, res) => {
    const adID = req.params.adID;

    try{
        const result = await db.getAdvertisementsByID(adID);
        
        if(!result)
            return res.status(404).json({message: `[server.mjs] Advertisement with ID=${adID} not found`});
        return res.json(result);
    }
    catch(error) {
        console.error("[server.mjs] Error fetching advertisement by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
})

app.get("/adminPanel", (req, res) => {
    const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const formatedClientIP = clientIP.replace(/^::ffff:/, "");                    
    const allowedIPs = process.env.ALLOWED_IP.split(",");
    
    if(!allowedIPs.includes(formatedClientIP))
        res.status(403).send("Access denied");

    const filePath = path.join(__dirname, `../public/html/adminPanel.html`);
    if (fs.existsSync(filePath)) res.sendFile(filePath);
    else res.redirect("/");
    
})

///////////////////////////////////////
///       Dynamic page routing      ///
///////////////////////////////////////
app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../public/html/${page}.html`);

    if (allowedPages.includes(page) && fs.existsSync(filePath))
        res.sendFile(filePath);
    else res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`[server.mjs] Running on http://localhost:${PORT}\n`);
});
