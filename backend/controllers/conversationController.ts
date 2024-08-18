import Conversation from '@/backend/models/Conversation';
import * as schema from '@/backend/graphql/generated/schemaType';

const conversationController = () => ({
  async create(data: { participants: string[] }): Promise<schema.Conversation> {
    const newConversation = new Conversation(data);
    const savedConversation = await newConversation.save();
    return savedConversation.toObject() as schema.Conversation;
  },

  async read(args: { id: string }): Promise<schema.Conversation | null> {
    const conversation = await Conversation.findById(args.id)
      .populate('participants')
      .populate('messages.sender')
      .exec();

    return conversation ? (conversation.toObject() as schema.Conversation) : null;
  },

  async list(filter: { participants?: string }): Promise<schema.Conversation[]> {
    const conversations = await Conversation.find(filter)
      .populate('participants')
      .populate('messages.sender')
      .exec();

    return conversations.map(conversation => conversation.toObject() as schema.Conversation);
  },

  async addMessage(args: { conversationId: string, sender: string, content: string }): Promise<schema.Message> {
    const conversation = await Conversation.findById(args.conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const message = {
      sender: args.sender,
      content: args.content,
      timestamp: new Date().toISOString(),  // Convert the Date to a string
    };

    conversation.messages.push(message);
    await conversation.save();

    return {
      ...message,
      sender: await conversation.populate('messages.sender').execPopulate(), // Populate the sender field for the return value
    } as schema.Message;
  },
});

export default conversationController;
