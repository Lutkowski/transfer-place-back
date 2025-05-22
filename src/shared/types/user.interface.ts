import { Request } from 'express';
import { UserEntity } from '../../infra/postgres/entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user: Pick<UserEntity, 'id' | 'name' | 'phone' | 'isAdmin'>;
}
