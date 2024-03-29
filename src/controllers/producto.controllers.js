import { pool } from '../db.js'

export const getProductos = async (req,res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM PRODUCTOS')
        res.json(rows)
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const getProductosId = async (req,res) => { 
    try{
        const [rows] = await pool.query('SELECT * FROM PRODUCTOS WHERE cod_producto = ?',[req.params.id])
        if(rows.length <= 0) return res.status(404).json({message: 'Producto no encontrado'})
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const createProductos = async (req,res) => {
    const {cod_producto,nom_producto,des_producto,stk_producto,preven_producto,precom_producto,cod_categoria } = req.body
    try{
        const [rows] = await pool.query('INSERT INTO PRODUCTOS (nom_producto,des_producto,stk_producto,preven_producto,precom_producto,cod_categoria) VALUES (?,?,?,?,?,?)',
        [nom_producto,des_producto,stk_producto,preven_producto,precom_producto,cod_categoria])
        res.send({
            id: rows.insertId,
            cod_producto,
            nom_producto,
            des_producto
        })
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const deleteProductos = async (req,res) => {
    try{
        const [result] =  await pool.query('DELETE FROM PRODUCTOS WHERE cod_producto = ?',[req.params.id])
        if(result.affectedRows <= 0) return res.status(404).json({ message:'Producto no encontrado'})
        console.log(result);
        res.sendStatus(204)
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}

export const updateProductos = async (req,res) => {
    const {id} = req.params
    const {nom_producto, des_producto, stk_producto } = req.body
    try{
        const [result] = await pool.query('UPDATE PRODUCTOS SET nom_producto = IFNULL(?,nom_producto), des_producto = IFNULL(?,des_producto), stk_producto = IFNULL(?,stk_producto) WHERE cod_producto = ?',[nom_producto,des_producto,stk_producto,id])
        
        if(result.affectedRows === 0) return res.status(404).json({ message: 'Empleado no encontrado'})

        const [rows] = await pool.query('SELECT * FROM PRODUCTOS WHERE cod_producto = ?',[id])
        res.json(rows[0])
    }catch(error){
        return res.status(500).json({ message: error.message })
    }
}