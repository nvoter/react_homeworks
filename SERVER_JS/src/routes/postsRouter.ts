import { Router, Request, Response } from "express";
import { postsController } from '../controllers/postsController';

const router = Router();

router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);

export default router;