export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ID']['output'];
  messages: Array<Message>;
  participants: Array<User>;
};

export type CreatePostInput = {
  author: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};

export type InputPlaceType = {
  desciption: Scalars['String']['input'];
  mainPhoto: Scalars['String']['input'];
  owner: Scalars['ID']['input'];
  photos: Array<InputMaybe<Scalars['String']['input']>>;
  priceByNight: Scalars['Float']['input'];
  type: Scalars['String']['input'];
};

export type InputReviewType = {
  author: Scalars['ID']['input'];
  feedback?: InputMaybe<Scalars['String']['input']>;
  place: Scalars['ID']['input'];
  rate: Scalars['Float']['input'];
};

export type InputUserType = {
  age: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  sender: User;
  timestamp: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  createConversation: Conversation;
  createPlace?: Maybe<Place>;
  createPost: Post;
  createReview?: Maybe<Review>;
  createUser?: Maybe<User>;
  deletePlace?: Maybe<Place>;
  deleteReview?: Maybe<Review>;
  deleteUser?: Maybe<User>;
  updatePlace?: Maybe<Place>;
  updateReview?: Maybe<Review>;
  updateUser?: Maybe<User>;
  updateUserInterests: User;
};


export type MutationAddMessageArgs = {
  content: Scalars['String']['input'];
  conversationId: Scalars['ID']['input'];
  sender: Scalars['ID']['input'];
};


export type MutationCreateConversationArgs = {
  recipient: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreatePlaceArgs = {
  body: InputPlaceType;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateReviewArgs = {
  body: InputReviewType;
};


export type MutationCreateUserArgs = {
  body: InputUserType;
};


export type MutationDeletePlaceArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdatePlaceArgs = {
  _id: Scalars['ID']['input'];
  body: InputPlaceType;
};


export type MutationUpdateReviewArgs = {
  _id: Scalars['ID']['input'];
  body: InputReviewType;
};


export type MutationUpdateUserArgs = {
  _id: Scalars['ID']['input'];
  body: InputUserType;
};


export type MutationUpdateUserInterestsArgs = {
  interests: Array<Scalars['String']['input']>;
  userId: Scalars['ID']['input'];
};

export type PaginationType = {
  __typename?: 'PaginationType';
  count: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pages: Scalars['Int']['output'];
};

export type Place = {
  __typename?: 'Place';
  _id: Scalars['ID']['output'];
  desciption?: Maybe<Scalars['String']['output']>;
  mainPhoto?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
  photos?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  priceByNight?: Maybe<Scalars['Float']['output']>;
  reviews?: Maybe<Array<Maybe<Review>>>;
};

export type PlaceEdgesType = {
  __typename?: 'PlaceEdgesType';
  edges?: Maybe<Array<Maybe<Place>>>;
  pagination?: Maybe<PaginationType>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID']['output'];
  author: User;
  content: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  timestamp: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getConversationBetweenUsers?: Maybe<Conversation>;
  listConversations: Array<Conversation>;
  listPlace?: Maybe<PlaceEdgesType>;
  listPosts: Array<Post>;
  listReview?: Maybe<ReviewEdgesType>;
  listUser?: Maybe<UserEdgesType>;
  readConversation?: Maybe<Conversation>;
  readPlace?: Maybe<Place>;
  readReview?: Maybe<Review>;
  readUser?: Maybe<User>;
  reviewByUser?: Maybe<Array<Maybe<Review>>>;
  searchPlace?: Maybe<Array<Maybe<Place>>>;
  searchReview?: Maybe<Array<Maybe<Review>>>;
  searchUser?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<User>;
};


export type QueryGetConversationBetweenUsersArgs = {
  recipientId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryListConversationsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryListPlaceArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListReviewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListUserArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReadConversationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReadPlaceArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryReadReviewArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryReadUserArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryReviewByUserArgs = {
  _id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchPlaceArgs = {
  fields: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchReviewArgs = {
  fields: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchUserArgs = {
  fields: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['ID']['input'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ID']['output'];
  author?: Maybe<User>;
  feedback?: Maybe<Scalars['String']['output']>;
  place?: Maybe<Scalars['ID']['output']>;
  rate?: Maybe<Scalars['Float']['output']>;
};

export type ReviewEdgesType = {
  __typename?: 'ReviewEdgesType';
  edges?: Maybe<Array<Maybe<Review>>>;
  pagination?: Maybe<PaginationType>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  age: Scalars['Int']['output'];
  country: Scalars['String']['output'];
  email: Scalars['String']['output'];
  interests: Array<Maybe<Scalars['String']['output']>>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  photo: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserEdgesType = {
  __typename?: 'UserEdgesType';
  edges?: Maybe<Array<Maybe<User>>>;
  pagination: PaginationType;
};
