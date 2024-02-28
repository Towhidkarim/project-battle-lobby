import z, { boolean } from 'zod';

export const UserTypeSchema = z.object({
  _id: z.string().optional(),
  userName: z.string().min(5),
  password: z.string().min(6),
  email: z.string().email(),
  ign: z.string().optional(),
  uid: z.string().optional(),
  phoneNumber: z.string(),
  role: z.union([
    z.literal('user'),
    z.literal('moderator'),
    z.literal('admin'),
  ]),
  lobbiesRegistered: z.array(z.string()),
  createdAt: z.date(),
  currentOtp: z.number().optional(),
  emailVerified: z.boolean(),
  ticketBalance: z.number(),
});

export type TUser = z.infer<typeof UserTypeSchema>;

export const LobbyRegistrationTypeSchema = z.object({
  player_id: z.string(),
  player_userName: z.string(),
  player_uid: z.string(),
  playerEmail: z.string().email(),
  playerNumber: z.string(),
  playerIGN: z.string(),
});
export type TLobbyRegistrationData = z.infer<
  typeof LobbyRegistrationTypeSchema
>;

export const LobbyTypeSchema = z.object({
  _id: z.string().optional(),
  lobbyTitle: z.string().min(3).max(48),
  gameName: z.string(),
  caption: z.string().min(3).max(65),
  maxCapacity: z.number().min(0),
  currentlyEntered: z.number().min(0),
  entryFee: z.number(),
  open: z.boolean(),
  status: z.union([
    z.literal('recruiting'),
    z.literal('running'),
    z.literal('ended'),
  ]),
  credentials: z
    .object({
      code: z.string(),
      password: z.string(),
    })
    .optional(),
  registrationData: z.array(LobbyRegistrationTypeSchema).optional(),
  tags: z.array(z.string()).optional(),
  lobbyCreationTime: z.date(),
  lobbyStartTime: z.date(),
});

export type TLobby = z.infer<typeof LobbyTypeSchema>;

const phoneNumberRegEx = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
export const SiteDataSchema = z.object({
  _id: z.string().optional(),
  packageInfo: z.array(
    z.object({
      name: z.string().min(3),
      description: z.string().min(3).optional(),
      price: z.number().min(0),
    })
  ),
  activeTransactionNumbers: z.array(
    z.object({
      number: z.string().regex(phoneNumberRegEx, 'Invalid Mobile Number'),
      type: z.string(),
    })
  ),
});

export type TSiteData = z.infer<typeof SiteDataSchema>;

const PurchaseRequestSchema = z.object({
  _id: z.string().optional(),
  userName: z.string(),
  email: z.string().email(),
  packageName: z.string(),
  packagePrice: z.number().min(0),
  transNumber: z.string(),
  method: z.string(),
  transactionID: z.string(),
  approved: z.boolean(),
});

export type TPurchaseRequest = z.infer<typeof PurchaseRequestSchema>;
