import mongoose, { Schema, Document, model, models } from 'mongoose';

interface IMessage extends Document {
  sender: mongoose.Schema.Types.ObjectId; // Reference to the User model
  content: string;
  timestamp: Date;
}

interface IConversation extends Document {
  participants: mongoose.Schema.Types.ObjectId[]; // Array of references to the User model
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema: Schema = new Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Array of User references
  messages: { type: [MessageSchema], default: [] },
});

// If the model is already compiled in Mongoose (because of hot-reloading, for instance), use that model, otherwise create a new one.
const Conversation = models.Conversation || model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
