import { Injectable } from '@nestjs/common';
import { MastersDao } from './masters.dao';

@Injectable()
export class MastersService {
  constructor(private readonly mastersDao: MastersDao) {}
}
