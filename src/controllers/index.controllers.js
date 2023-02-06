import { pool } from '../db.js'

export const ping = async (req,res) => {
    try{
        const [result] = await pool.query('SELECT "Pong" AS result') 
        res.json(result[0])
    }catch(error){
        res.send(error.message)
    }
}