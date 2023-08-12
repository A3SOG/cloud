import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import CharacterService from "../services/CharacterService";
// import createMQProducer from "../utils/producer";
// import { AMQP_URL, QUEUE_NAME } from "../config";

const characterService = new CharacterService();
// const producer = createMQProducer(AMQP_URL as string, QUEUE_NAME as string);

const getCharacterByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key;
  const row = await characterService.getCharacterByKey(key);
  // const msg = {
  //   action: "FETCHCHARACTER",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find character with KEY ${key}`);
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

const getArmoryByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key;
  const row = await characterService.getArmoryByKey(key);
  // const msg = {
  //   action: "FETCHARMORY",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find character armory with KEY ${key}`);
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

const getGarageByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key;
  const row = await characterService.getGarageByKey(key);
  // const msg = {
  //   action: "FETCHGARAGE",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find character garage with KEY ${key}`);
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

const getMessagesByKey = asyncHandler(async (req: Request, res: Response) => {
  const key = req.params.key;
  const row = await characterService.getMessagesByKey(key);
  // const msg = {
  //   action: "FETCHMESSAGES",
  //   data: { row },
  // };
  // producer(JSON.stringify(msg));

  try {
    if (row.length > 0) {
      res.status(200).json(row);
    } else {
      res.status(404);
      throw new Error(`Cannot find messages with KEY ${key}`);
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

export { getCharacterByKey, getMessagesByKey, getArmoryByKey, getGarageByKey };
