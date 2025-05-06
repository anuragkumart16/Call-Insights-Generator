import { Router } from "express";
import { audioInsightViaLink , audioInsightViaFile } from "../controllers/audioinsight.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/link').post(audioInsightViaLink)
router.route('/file').post(upload.single('file'),audioInsightViaFile)

export default router