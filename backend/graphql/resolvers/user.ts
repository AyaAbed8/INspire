import userController from '@/backend/controllers/userController';
import { resolverType } from 'fast-graphql';
import * as schema from '@/backend/graphql/generated/schemaType';
import User from '@/backend/models/User';

const Query = {
  async user(parent: any, args: any, ctx: any): Promise<schema.Query['user']> {  // Add this resolver
    return await User.findById(args._id);
  },
  async readUser(parent: any, args: any, ctx: any): Promise<schema.Query['readUser']> {
    try {
      const user = await User.findById(args._id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error reading user:', error);
      throw new Error('Failed to fetch user');
    }
  },
  async listUser(parent: any, args: any, ctx: any): Promise<schema.Query['listUser']> {
    return await userController().list(args);
  },
  async searchUser(parent: any, args: any, ctx: any): Promise<schema.Query['searchUser']> {
    return await userController().search(args);
  },
};

const Mutation = {
  async createUser(parent: any, args: any, ctx: any): Promise<schema.Mutation['createUser']> {
    console.log('args:', args);
    const { name, email, age, country, role, interests, password } = args.body;
    return await userController().create({ name, email, age, country, role, interests, password });
  },
  async updateUser(parent: any, args: any, ctx: any): Promise<schema.Mutation['updateUser']> {
    return await userController().update(args);
  },
  async deleteUser(parent: any, args: any, ctx: any): Promise<schema.Mutation['deleteUser']> {
    return await userController().delete(args);
  },
  async updateUserInterests(
    parent: any,
    args: { userId: string, interests: string[] },
    ctx: any
  ): Promise<schema.Mutation['updateUserInterests']> {
    console.log("Received interests:", args.interests);

    const user = await User.findById(args.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's interests
    user.interests = args.interests;
    console.log('Updated User Interests:', user.interests);

    // Save the updated user back to the database
    await user.save();
    console.log('User successfully saved:', user);

    return user;
  },
};

const resolver: resolverType = { Query, Mutation };

export default resolver;
