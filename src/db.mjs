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

//  Photo gallery
export async function getPhotos(limit, offset)
{
    try {
        if(arguments.length === 0){
            const [allResults, fields] = await connection.query("SELECT * FROM `photo_gallery`");
            return allResults;
        }
        else{
            const [results, fields] = await connection.query("SELECT * FROM `photo_gallery` LIMIT ? OFFSET ?", [limit, offset]);
            const [rows] = await connection.query("SELECT COUNT(*) AS `total` FROM `photo_gallery`");
            const totalPhotos = rows[0]?.total ?? 0; 
            //console.log(`RESULTS = ${results[0].photo_path}   |   TOTALPHOTOS = ${rows[0].total}`);
            // RESULTS = images/photo_gallery/images_2.webp   |   TOTALPHOTOS = 12
            return {results, totalPhotos};
        }
    } 
    catch (error) { 
        console.log(error); 
        return { results: [], totalPhotos: 0 };
    }
}

//  Our teachers
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

export async function getOurTeachersByID(teacherID) {
    const [results, fields] = await connection.query("SELECT * FROM `our_teachers` WHERE `ID` = ?", [teacherID]);
    return results;
}

//  Schedule
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

//  Advertisement
export async function getAdvertisements()
{
    try {
        const [allResults, allFields] = await connection.query("SELECT * FROM `advertisement`");
        const [resultsNoLast, fieldsNoLast] = await connection.query("SELECT * FROM `advertisement` ORDER BY `ID` DESC LIMIT 1, 10000");
        const [resultForLast, fieldsForLast] = await connection.query("SELECT * FROM `advertisement` ORDER BY `ID` DESC LIMIT 1");

        return {allResults, resultsNoLast, resultForLast};
    } 
    catch (error) { 
        console.log(error); 
        return {allResults:[], resultsNoLast: [], resultForLast: null };
    }
}

export async function getAdvertisementsByID(adID) 
{
    const [results, fields] = await connection.query("SELECT * FROM `advertisement` WHERE `ID` = ?", [adID]);
    return results;
}

export async function addAdvertisement(picture_path, title, description, alt_text) {
    const [result] = await connection.query("INSERT INTO `advertisement`(`picture_path`, `title`, `description`, `alt_text`) VALUES (?, ?, ?, ?)", 
        [picture_path, title, description, alt_text]);
    return result;
}

export async function deleteAdvertisement(adID) {
    await connection.query("DELETE FROM `advertisement` WHERE `ID`= ? ", [adID]);
}

export async function updateAdvertisement(adID, picture_path, title, description, alt_text) {
    const [results] = await connection.query("UPDATE `advertisement` SET `picture_path`= ? ,`title`= ? ,`description`= ? ,`alt_text`= ? WHERE `ID` = ?", 
        [picture_path, title, description, alt_text, adID]);
    return results;
}