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
        const rooms = await Room.aggregate([
          { $match: {status: "waiting"}},
          { $sample: { size: 1 } }
        ]);
        if (rooms.length > 0){
          const roomId = rooms[0]._id;
          await Room.findByIdAndUpdate(roomId, {
            status: "chatting",
          });
        }
        res.status(200).json(rooms);
      } catch (error) {
        res.status(400).json((error as any).message);
      } 
      break;
    case "POST":
      const room = await Room.create({
        status: "waiting",
      });
      res.status(200).json(room);
    default:
      res.status(400).json("Bad request");
      break;
    }
}
