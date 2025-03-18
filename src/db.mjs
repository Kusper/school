import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
    try{
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        });

        console.log("[db.mjs] Connected to DB successfully")
        return conn;
    }
    catch (error){
        console.error("[db.mjs] Failed connection to DB:", error);
        throw error;
    }
}

const connection = await connectToDB();

///////////////////////////////////////////

export async function getPhotos(limit, offset)
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `photo_gallery` LIMIT ? OFFSET ?", [limit, offset]);
        const [rows] = await connection.query("SELECT COUNT(*) AS `total` FROM `photo_gallery`");
        const totalPhotos = rows[0]?.total ?? 0; 
        //console.log(`RESULTS = ${results[0].photo_path}   |   TOTALPHOTOS = ${rows[0].total}`);
        // RESULTS = images/photo_gallery/images_2.webp   |   TOTALPHOTOS = 12
        return {results, totalPhotos};
    } 
    catch (error) { 
        console.log(error); 
        return { results: [], totalPhotos: 0 };
    }
}

export async function getOurTeachers()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `our_teachers`");
        return results;
    } 
    catch (error) { 
        console.log(error); 
        return [];
    }
}

export async function getSchedule()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `schedule`");
        return results;
    } catch (error) { 
        console.log(error); 
        return [];
    }
}

export async function getAdvertisements()
{
    try {
        const [resultsNoLast, fieldsNoLast] = await connection.query("SELECT * FROM `advertisement` ORDER BY `ID` DESC LIMIT 1, 10000");
        const [rows] = await connection.query("SELECT COUNT(*) AS `total` FROM `advertisement`");
        const totalAds = rows[0]?.total ?? 0; 
        const [resultForLast, fieldsForLast] = await connection.query("SELECT * FROM `advertisement` ORDER BY `ID` DESC LIMIT 1");

        return {resultsNoLast, totalAds, resultForLast};
    } 
    catch (error) { 
        console.log(error); 
        return { resultsNoLast: [], totalAd: 0, resultForLast: null };
    }
}