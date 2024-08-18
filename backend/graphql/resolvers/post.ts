import Post from '@/backend/models/Post';
import User from '@/backend/models/User';
import { resolverType } from 'fast-graphql';
import * as schema from '@/backend/graphql/generated/schemaType';

const Query = {
  async listPosts(parent, args, ctx) {
    try {
      const posts = await Post.find().populate('author');
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  },
};


const Mutation = {
  async createPost(parent: any, args: { input: schema.CreatePostInput }, ctx: any) {
    const { author, content, tags } = args.input;

    try {
      const newPost = new Post({
        author,
        content,
        tags,
        timestamp: new Date(),
      });

      await newPost.save();
      return newPost.populate('author');
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  },
};

const resolver: resolverType = { Query, Mutation };

export default resolver;
