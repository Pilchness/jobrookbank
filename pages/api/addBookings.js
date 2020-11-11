import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const post = await db.collection('bookingdata').insertOne({
      date: req.body.date,
      appointments: req.body.appointments
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
