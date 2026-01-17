import express from 'express'
import {createResource, getResources , deleteResource , toggleVote} from '../controllers/resourceController.js'
import {protect} from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/',getResources)
router.post("/",protect,createResource)
router.delete('/:id',protect,deleteResource)
router.put('/:id/vote' , protect , toggleVote)

export default router