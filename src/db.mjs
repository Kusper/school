import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export async function getPhotos()
{
    const [rows] = await pool.query("SELECT `photo_path` FROM `photo_gallery`");
    return rows;
}

export async function getSchedule()
{
    const [rows] = await pool.query("SELECT * FROM `schedule`");
    return rows;
}

export async function getOurTeachers()
{
    const [rows] = await pool.query("SELECT * FROM `our_teachers`");
    return rows;
}

export async function getAdvertisement()
{
    const [rows] = await pool.query("SELECT * FROM `advertisement`");
    return rows;
}

export default pool;