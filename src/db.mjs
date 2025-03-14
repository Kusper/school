import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// DB connection 
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
});



export async function getPhotos()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `photo_gallery`");
        return results;
    } 
    catch (err) { console.log(err); }
}

export async function getOurTeachers()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `our_teachers`");
        return results;
    } 
    catch (err) { console.log(err); }
}

export async function getSchedule()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `schedule`");
        return results;
    } catch (err) { console.log(err); }
}

export async function getAdvertisement()
{
    try {
        const [results, fields] = await connection.query("SELECT * FROM `advertisement`");
        return results;
    } catch (err) { console.log(err); }
}