export default `# backend/graphql/typeDefs/conversation.gql

type Message {
  sender: User!
  content: String!
  timestamp: String!
}

type Conversation {
  _id: ID!
  participants: [User!]!
  messages: [Message!]!
}

type Query {
  listConversations(userId: ID!): [Conversation!]!
  readConversation(id: ID!): Conversation
  getConversationBetweenUsers(userId: ID!, recipientId: ID!): Conversation 
}

type Mutation {
  createConversation(userId: ID!, recipient: ID!): Conversation!
  addMessage(conversationId: ID!, sender: ID!, content: String!): Message!
}
 type Place {
  _id: ID!
  owner: User
  desciption: String
  mainPhoto: String
  photos: [String]
  priceByNight: Float
  reviews: [Review]
}

input InputPlaceType {
  type: String!
  owner: ID!
  desciption: String!
  mainPhoto: String!
  photos: [String]!
  priceByNight: Float!
}

type Mutation {
  createPlace(body: InputPlaceType!): Place
  updatePlace(_id: ID!, body: InputPlaceType!): Place
  deletePlace(_id: ID!): Place
}

type PaginationType {
  page: Int
  pages: Int
  count: Int
}

type PlaceEdgesType {
  edges: [Place]
  pagination: PaginationType
}

type Query {
  readPlace(_id: ID!): Place
  listPlace(page: Int, limit: Int, sortBy: String, sortOrder: String): PlaceEdgesType
  searchPlace(limit: Int, query: String!, fields: String!): [Place]
}
 # backend/graphql/typeDefs/post.gql

type Post {
  _id: ID!
  author: User!
  content: String!
  tags: [String!]!
  timestamp: String!
}

type Query {
  listPosts: [Post!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}

input CreatePostInput {
  author: ID!
  content: String!
  tags: [String!]!
}

 type Review {
  _id: ID!
  author: User
  feedback: String
  rate: Float
  place: ID
}

type Query {
  reviewByUser(_id: ID): [Review]
}

input InputReviewType {
  author: ID!
  feedback: String
  rate: Float!
  place: ID!
}

type Mutation {
  createReview(body: InputReviewType!): Review
  updateReview(_id: ID!, body: InputReviewType!): Review
  deleteReview(_id: ID!): Review
}

type PaginationType {
  page: Int
  pages: Int
  count: Int
}

type ReviewEdgesType {
  edges: [Review]
  pagination: PaginationType
}

type Query {
  readReview(_id: ID!): Review
  listReview(page: Int, limit: Int, sortBy: String, sortOrder: String): ReviewEdgesType
  searchReview(limit: Int, query: String!, fields: String!): [Review]
}
 type User {
  _id: ID!
  name: String!
  email: String!
  age: Int!
  country: String!
  role: String!
  password: String!
  interests: [String]!
  photo: String!
}

input InputUserType {
  name: String!
  email: String!
  age: Int!
  country: String!
  role: String!
  password: String!
}

type Mutation {
  createUser(body: InputUserType!): User
  updateUser(_id: ID!, body: InputUserType!): User
  deleteUser(_id: ID!): User
  updateUserInterests(userId: ID!, interests: [String!]!): User!
}

type PaginationType {
  page: Int!
  pages: Int!
  count: Int!
}

type UserEdgesType {
  edges: [User]
  pagination: PaginationType!
}

type Query {
  user(_id: ID!): User
  readUser(_id: ID!): User
  listUser(page: Int, limit: Int, sortBy: String, sortOrder: String): UserEdgesType
  searchUser(limit: Int, query: String!, fields: String!): [User]
}
`;