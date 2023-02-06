import { Router } from 'express'
import { getProductosId,getProductos,createProductos,updateProductos,deleteProductos } from '../controllers/producto.controllers.js'
const router = Router()

router.get('/productos', getProductos)
router.get('/productos/:id', getProductosId)

router.post('/productos', createProductos)

router.patch('/productos/:id', updateProductos)

router.delete('/productos/:id', deleteProductos)

export default router