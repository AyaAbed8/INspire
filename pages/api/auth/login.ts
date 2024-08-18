import connectToDatabase from '@/backend/database/connectToDatabase';
import User from '@/backend/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Include additional fields in the response
    res.status(200).json({ 
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        country: user.country,
        role: user.role,
        interests: user.interests
      } 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
