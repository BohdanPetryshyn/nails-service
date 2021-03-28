import { Request } from 'express';
import { User } from './user/user';

export type AuthedRequest = Request & { user: User };
