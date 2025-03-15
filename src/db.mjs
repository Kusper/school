import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function connectToDB() {
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        });

        console.log("[db.mjs] Connected to DB succesfully\n")
        return connection;
    }
    catch (error){
        console.error("[db.mjs] Failed connection to DB:", error);
        throw error;
    }
}

const db = connectToDB();

///////////////////////////////////////////

export async function getPhotos(limit, offset)
{
    try {
        const [results, fields] = await db.query("SELECT * FROM `photo_gallery` LIMIT ? OFFSET ?", [limit, offset]);
        // console.log("SELECT * FROM `photo_gallery` LIMIT ? OFFSET ?", [limit, offset]);
        return results;
    } 
    catch (error) { console.log(error); }
}

export async function getOurTeachers()
{
    try {
        const [results, fields] = await db.query("SELECT * FROM `our_teachers`");
        return results;
    } 
    catch (error) { console.log(error); }
}

export async function getSchedule()
{
    try {
        const [results, fields] = await db.query("SELECT * FROM `schedule`");
        return results;
    } catch (error) { console.log(error); }
}

export async function getAdvertisement()
{
    try {
        const [results, fields] = await db.query("SELECT * FROM `advertisement`");
        return results;
    } catch (error) { console.log(error); }
}