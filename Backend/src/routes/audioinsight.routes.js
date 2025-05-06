import { Router } from "express";
import { audioInsightViaLink } from "../controllers/audioinsight.controller.js";

const router = Router();

router.route('/link').post(audioInsightViaLink)

export default router