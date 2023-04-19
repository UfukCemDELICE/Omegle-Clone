import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/libs/dbConntect';
import Room from '../../models/Rooms';

type Room = {
  status: string;
};

type ResponseData = Room[] | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
){
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const rooms = await Room.find({});
        res.status(200).json(rooms);
      } catch (error) {
        res.status(400).json((error as any).message);
      } 
      break;
    default:
      res.status(400).json("Bad request");
      break;
    }
}
