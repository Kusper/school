import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import livereload from "livereload";
import connectLivereload from "connect-livereload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;
const allowedPages = ["index", "advertisement", "gallery"];

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
    console.log(`Running on http://localhost:${PORT}`);
});
