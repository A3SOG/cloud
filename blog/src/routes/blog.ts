import express, { Request, Response } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogController";

const router = express.Router();

// router.get('/', (req: Request, res: Response) => {
//   res.json({ "msg": "Welcome to the Blog Micro-Service" })
// });
router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
