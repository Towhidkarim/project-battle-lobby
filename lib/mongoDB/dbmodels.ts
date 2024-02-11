import { model, models, Schema } from 'mongoose';
import { TUser } from '@/lib/types';

const UserSchema = new Schema<TUser>({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  inGameTag: { type: String, required: false },
  createdAt: { type: Date, required: true },
  emailVerified: { type: Boolean, required: true },
  currentOtp: { type: Number, required: false },
});

export const Users = models?.Users || model('Users', UserSchema);
