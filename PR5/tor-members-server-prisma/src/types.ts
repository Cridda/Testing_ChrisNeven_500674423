import { Prisma, User } from '../src/generated/prisma-client';

export interface Context {
    prisma: Prisma;
    request: any;
}

export interface AuthPayload {
    token: string;
    user: User;
}
