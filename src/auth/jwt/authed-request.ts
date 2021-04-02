import { Request } from 'express';
import { Payload } from './payload';

export type AuthedRequest = Request & { user: Payload };
