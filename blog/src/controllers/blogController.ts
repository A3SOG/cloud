import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import BlogService from "../services/BlogService";
// import createMQProducer from "../utils/producer";
// import { AMQP_URL, QUEUE_NAME } from "../config";

const blogService = new BlogService();
// const producer = createMQProducer(AMQP_URL as string, QUEUE_NAME as string);

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const row = await blogService.createBlog(req.body);
  // const msg = {
  //   action: "CREATEBLOG",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.status(201).json(row);
  } catch (e) {
    res.status(500);
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
});

const getAllBlogs = asyncHandler(async (req: Request, res: Response) => {
  const rows = await blogService.getAllBlogs();
  // const msg = {
  //   action: "FETCHBLOGS",
  //   data: { rows },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.json(rows);
  } catch (e) {
    res.status(500);
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
});

const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const row = await blogService.getBlogById(id);
  // const msg = {
  //   action: "FETCHBLOG",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(201).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find blog with ID ${id}`);
    }
  } catch (e) {
    res.status(500);
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
});

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date, author, image, summary, content, tags } = req.body;
  const row = await blogService.updateBlog(id, {
    title,
    date,
    author,
    image,
    summary,
    content,
    tags,
  });
  // const msg = {
  //   action: "UPDATEBLOG",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    res.json(row);
  } catch (e) {
    res.status(500);
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
});

const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const row = await blogService.deleteBlog(id);
  // const msg = {
  //   action: "DELETEBLOG",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find blog with ID ${id}`);
    }
  } catch (e) {
    res.status(500);
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw e;
    }
  }
});

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
