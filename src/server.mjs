import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import fs, { truncateSync } from "fs";
import { fileURLToPath } from "url";

import * as db from "./db.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const allowedPages = ["index", "advertisement", "gallery", "our_teachers", "about_us"];

///////////////////////////////////////

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
});

                    ///////////////////////////////////////
                    ///           API requests          ///
                    ///////////////////////////////////////

///////////////////////////////////////
///           Photo gallery         ///
///////////////////////////////////////
app.get("/api/gallery", async (req, res) => {
    try {
        const offset = parseInt(req.query.offset);
        const limit = parseInt(req.query.limit);

        if(!offset && !limit){
            res.json(await db.getPhotos());
            return;
        }

        res.json(await db.getPhotos(limit, offset));
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

//  Get by ID
app.get("/api/gallery/:photoID", async (req, res) => {
    const photoID = req.params.photoID;

    try{
        const result = await db.getPhotoByID(photoID);
        
        if(!result)
            return res.status(404).json({message: `Photo with ID=${photoID} not found`});
        return res.json(result);
    }
    catch(error) {
        console.error("Error fetching photo by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
})

//  Insert
app.post("/api/addPhoto", async (req, res) => {
    const {photo_path, alt_text} = req.body;
    if( !photo_path || !alt_text)
        return res.status(400).json({message: "Missing required fields"});

    try{
        const result = await db.addPhoto(photo_path, alt_text)
        // console.log("Newly inserted ad ID:", result.insertId);
        res.json({addSuccess: true, resultID: result.insertId});
    }
    catch(error){
        console.error("Error inserting photo: ", error);
        res.status(500).json({addSuccess:false, message: "Internal server error"});
    }
}) 

//  Delete
app.delete("/api/deletePhoto/:photoID", async (req, res) => {
    const photoID = req.params.photoID;
    if(!photoID) return res.status(400).json({message: "Missing required field"});

    try{
        await db.deletePhoto(photoID);
        res.json({ removeSuccess: true, resulID: photoID})
    }
    catch(error){
        console.error("Error deleting photo: ", error);
        res.status(500).json({ removeSuccess: false, message: "Internal server error"});
    }
})

///////////////////////////////////////
///             Schedule            ///
///////////////////////////////////////
app.get("/api/schedule", async (req, res) => {
    try {
        res.json(await db.getSchedule());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

///////////////////////////////////////
///            Our techers          ///
///////////////////////////////////////
app.get("/api/our_teachers", async (req, res) => {
    try {
        res.json(await db.getOurTeachers());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

//  Get by ID
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

//  Insert
app.post("/api/addOur_teacher", async (req, res) => {
    const {picture_path, full_name, subject, description} = req.body;
    if( !picture_path || !full_name || !subject || !description)
        return res.status(400).json({message: "Missing required fields"});

    try{
        const result = await db.addOurTeacher(picture_path, full_name, subject, description)
        // console.log("Newly inserted ad ID:", result.insertId);
        res.json({addSuccess: true, resultID: result.insertId});
    }
    catch(error){
        console.error("Error inserting teacher: ", error);
        res.status(500).json({addSuccess:false, message: "Internal server error"});
    }
}) 

//  Delete
app.delete("/api/deleteOur_teacher/:teacherID", async (req, res) => {
    const teacherID = req.params.teacherID;
    if(!teacherID) return res.status(400).json({message: "Missing required field"});

    try{
        await db.deleteOurTeacher(teacherID);
        res.json({ removeSuccess: true, resulID: teacherID})
    }
    catch(error){
        console.error("Error deleting teacher: ", error);
        res.status(500).json({ removeSuccess: false, message: "Internal server error"});
    }
})

//  Update
app.patch("/api/updateOur_teacher", async (req, res) => {
    const {teacherID, picture_path, full_name, subject, description} = req.body;
    console.log(teacherID, picture_path, full_name, subject, description);
    if( !teacherID || !picture_path || !full_name || !subject || !description)
        return res.status(400).json({message: "Missing required fields"});

    try{
        const results = await db.updateOurTeacher(teacherID, picture_path, full_name, subject, description);
        res.json({ updateSuccess: true, results: results });
    }
    catch(error){
        console.error("Error updating teacher: ", error);
        res.status(500).json({ updateSuccess: false, message: "Internal server error" });
    }
})

///////////////////////////////////////
///           Advertisement         ///
///////////////////////////////////////
app.get("/api/advertisements", async (req, res) => {
    try {
        res.json(await db.getAdvertisements());
    }
    catch (error) {
        res.status(500).json({ error : error.message });
    };
})

//  Get by ID
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

//  Insert
app.post("/api/addAdvertisement", async (req, res) => {
    const {picture_path, title, description, alt_text} = req.body;
    if( !picture_path || !title || !description || !alt_text)
        return res.status(400).json({message: "Missing required fields"});

    try{
        const result = await db.addAdvertisement(picture_path, title, description, alt_text)
        // console.log("Newly inserted ad ID:", result.insertId);
        res.json({addSuccess: true, resultID: result.insertId});
    }
    catch(error){
        console.error("[server.mjs] Error inserting advertisement: ", error);
        res.status(500).json({addSuccess:false, message: "Internal server error"});
    }
}) 

//  Delete
app.delete("/api/deleteAdvertisement/:adID", async (req, res) => {
    const adID = req.params.adID;
    if(!adID) return res.status(400).json({message: "Missing required field"});

    try{
        await db.deleteAdvertisement(adID);
        res.json({ removeSuccess: true, resulID: adID})
    }
    catch(error){
        console.error("[server.mjs] Error deleting advertisement: ", error);
        res.status(500).json({ removeSuccess: false, message: "Internal server error"});
    }
})

//  Update
app.patch("/api/updateAdvertisement", async (req, res) => {
    const {adID, picture_path, title, description, alt_text} = req.body;
    // console.log(adID, picture_path, title, description, alt_text);
    if( !adID || !picture_path || !title || !description || !alt_text)
        return res.status(400).json({message: "Missing required fields"});

    try{
        const results = await db.updateAdvertisement(adID, picture_path, title, description, alt_text);
        res.json({ updateSuccess: true, results: results });
    }
    catch(error){
        console.error("Error updating advertisement: ", error);
        res.status(500).json({ updateSuccess: false, message: "Internal server error" });
    }
})

///////////////////////////////////////
///           Admin panel           ///
///////////////////////////////////////
app.set("trust proxy", true);
app.get("/adminPanel", (req, res) => {
    const clientIP = req.ip.replace(/^::ffff:/, "").replaceAll(":", "");
    const allowedIPs = process.env.ALLOWED_IP.split(",");
    
    if(!allowedIPs.includes(clientIP))
        return res.status(403).send("Access denied");

    const filePath = path.join(__dirname, `../public/html/adminPanel.html`);
    if (fs.existsSync(filePath)) return res.sendFile(filePath);
    else return res.redirect("/");
    
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
