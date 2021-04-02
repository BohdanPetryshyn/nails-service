import { Request } from 'express';
import { UserPersonalData } from './userPersonalData';

export type AuthedRequest = Request & { user: UserPersonalData };
