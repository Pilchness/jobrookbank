import { connectToDatabase } from '../../util/mongodb';
import dateFormat from 'dateformat';
const now = new Date();

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const post = await db.collection('posts').insertOne({
      username: req.body.username,
      text: req.body.text,
      date: dateFormat(now, 'dddd mmmm dS yyyy, h:MMtt'),
      colour: '#1aa6b7'
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
