// backend/models/Post.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  tags: string[];
  timestamp: Date;
}

const PostSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags: [{ type: String, required: true }],
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

