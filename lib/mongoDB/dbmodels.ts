import { model, models, Schema } from 'mongoose';
import { LobbyRegistrationTypeSchema, TLobby, TUser } from '@/lib/types';
import { number, z } from 'zod';

const UserSchema = new Schema<TUser>({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false },
  ign: { type: String, required: false },
  uid: { type: String, required: false },
  phoneNumber: String,
  lobbiesRegistered: [String], //Lobby object ID's
  ticketBalance: { type: Number, required: false },
  createdAt: { type: Date, required: true },
  emailVerified: { type: Boolean, required: true },
  currentOtp: { type: Number, required: false },
});

export const Users = models?.Users || model<TUser>('Users', UserSchema);

// const registrationDataSchema = new Schema<
//   z.infer<typeof LobbyRegistrationTypeSchema>
// >({
//   player_id: String,
//   playerEmail: String,
//   playerNumber: String,
//   playerIGN: String,
// });

const LobbySchema = new Schema<TLobby>({
  caption: String,
  gameName: String,
  lobbyTitle: String,
  currentlyEntered: Number,
  maxCapacity: Number,
  entryFee: Number,
  open: Boolean,
  status: String,
  credentials: {
    code: String,
    password: String,
  },
  registrationData: [
    {
      player_id: String,
      playerEmail: String,
      playerNumber: String,
      playerIGN: String,
      player_userName: String,
      player_uid: String,
    },
  ],
  lobbyCreationTime: Date,
  lobbyStartTime: Date,
  tags: [String],
});

export const Lobbies = models?.Lobbies || model<TLobby>('Lobbies', LobbySchema);
