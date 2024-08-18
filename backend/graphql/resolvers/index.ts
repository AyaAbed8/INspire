import { combineResolvers, resolverType } from 'fast-graphql';

import user from './user';
import place from './place';
import review from './review';
import conversation from './conversation'
import post from './post'

const resolvers: resolverType[] = [place, user, review, conversation, post];

const cominedResolvers = combineResolvers({ resolvers });

export default cominedResolvers;
