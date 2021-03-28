import { Request } from 'express';
import { User } from './user';

export type AuthedRequest = Request & { user: User };
