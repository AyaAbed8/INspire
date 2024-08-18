import conversationController from '@/backend/controllers/conversationController';
import User from '@/backend/models/User';
import Conversation from '@/backend/models/Conversation';
import { resolverType } from 'fast-graphql';
import * as schema from '@/backend/graphql/generated/schemaType';

const Query = {
  async listConversations(
    parent: unknown,
    args: { userId: string },
    ctx: unknown
  ): Promise<schema.Query['listConversations']> {
    try {
      // Fetch conversations where the user is a participant
      const conversations = await conversationController().list({ participants: args.userId });

      // Populate sender for each message
      const populatedConversations = await Conversation.populate(conversations, {
        path: 'messages.sender',
        select: 'name _id',
      });

      // Filter out conversations where any participant or message sender is null
      const validConversations = populatedConversations.filter(conversation => {
        const allParticipantsExist = conversation.participants.every(participant => participant !== null);
        const allSendersExist = conversation.messages.every(message => message.sender !== null);
        
        return allParticipantsExist && allSendersExist;
      });

      return validConversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw new Error('Failed to fetch conversations');
    }
  },


  async readConversation(
    parent: unknown,
    args: { id: string },
    ctx: unknown
  ): Promise<schema.Query['readConversation']> {
    try {
      return await conversationController().read(args);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw new Error('Failed to fetch conversation');
    }
  },

  async getConversationBetweenUsers(
    parent: any,
    args: { userId: string; recipientId: string },
    ctx: any
  ) {
    if (!args.userId || !args.recipientId) {
      throw new Error('Both userId and recipientId are required');
    }

    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [args.userId, args.recipientId] },
      }).exec();

      if (!conversation) {
        console.log('No existing conversation found. Creating a new one.');
        conversation = new Conversation({
          participants: [args.userId, args.recipientId],
          messages: [],
        });
        await conversation.save();
      }

      return conversation;
    } catch (error) {
      console.error('Error fetching or creating conversation between users:', error);
      throw new Error('Failed to fetch or create conversation');
    }
  },
};

const Mutation = {
  async createConversation(
    parent: any,
    args: { userId: string, recipient: string },
    ctx: any
  ): Promise<schema.Conversation> {
    const recipientUser = await User.findById(args.recipient);
    if (!recipientUser) {
      throw new Error('Recipient not found');
    }

    let conversation = new Conversation({
      participants: [args.userId, recipientUser._id],
      messages: [],
    });

    await conversation.save();
    
    // Use the populate method to load references and return the conversation object
    conversation = await conversation.populate('participants').execPopulate();
    return conversation;
  },

  async addMessage(
    parent: unknown,
    args: { conversationId: string; sender: string; content: string },
    ctx: unknown
  ): Promise<schema.Mutation['addMessage']> {
    const conversation = await Conversation.findById(args.conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const user = await User.findById(args.sender);
    if (!user) {
      throw new Error('Sender not found');
    }

    const message = {
      sender: user._id,
      content: args.content,
      timestamp: new Date().toISOString(),
    };

    conversation.messages.push(message);
    await conversation.save();

    return {
      sender: user,
      content: message.content,
      timestamp: message.timestamp,
    };
  },
};

const resolver: resolverType = { Query, Mutation };

export default resolver;
