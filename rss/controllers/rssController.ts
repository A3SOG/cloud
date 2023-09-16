import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Feed from 'rss'
import RSSService from '../services/RSSService'

const rssService = new RSSService()

const createRSS = asyncHandler(async (req: Request, res: Response) => {
  const row = await rssService.createRSS(req.body)

  try {
    res.status(201).json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getAllRSS = asyncHandler(async (req: Request, res: Response) => {
  const feed = new Feed({
    title: "SOG RSS Feed",
    description: "A simple RSS feed for SOG",
    language: "en",
    feed_url: "",
    site_url: ""
  })
  const rows = await rssService.getAllRSS()
  rows.forEach(item => {
    feed.item({
      title: item.title,
      description: item.description,
      url: item.url,
      date: item.date
    })
  })

  try {
    res.set('Content-Type', 'text/xml')
    res.send(feed.xml())
    // res.json(rows)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getRSSById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await rssService.getRSSById(id)

  try {
    if (row) {
      res.status(201).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find rss with ID ${id}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const updateRSS = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, date, url } = req.body
  const row = await rssService.updateRSS(id, {
    title,
    description,
    date,
    url
  })

  try {
    res.json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const deleteRSS = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await rssService.deleteRSS(id)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find rss with ID ${id}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

export { createRSS, getAllRSS, getRSSById, updateRSS, deleteRSS }
