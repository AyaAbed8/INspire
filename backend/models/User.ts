import mongoose, { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import * as schemaType from '@/backend/graphql/generated/schemaType';

const schema = new Schema<schemaType.User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  interests: { type: [String], default: [] },
  photo: { type: String, required: false },
});

// Pre-save hook to hash password before saving
schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password during login
schema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default models.User || model<schemaType.User>('User', schema);
