import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/////////////////////////////////// First service ///////////////////////////////////
export const createKey = async (accountId: string, name: string) => {
    // Generate prefix and secret
    const prefix = crypto.randomBytes(4).toString('hex'); // 4B = 8 chars in hexadecimal
    const secret = crypto.randomBytes(16).toString('hex'); // 16B = 32 chars in hexadecimal

    const generatedApiKey = `${prefix}.${secret}`;

    // Hashing the secret
    const rounds = 10;
    const secretHash = await bcrypt.hash(secret, rounds);

    // Store data in the database
    const newKey = await prisma.apiKey.create({
        data: {
        accountId,
        name,
        prefix,
        secretHash,
        },
    });

    return {
        id: newKey.id,
        accountId: newKey.accountId,
        name: newKey.name,
        prefix: newKey.prefix,
        createdAt: newKey.createdAt,
        revokedAt: newKey.revokedAt,
        apiKey: generatedApiKey,
    };
};

/////////////////////////////////// Second service ///////////////////////////////////
export const listKeys = async (accountId: string) => {
    // Filtered the data
    const filterByAccount = { accountId: accountId };
    const sortByNewest = { createdAt: 'desc' as const };
    
    return await prisma.apiKey.findMany({
    where: filterByAccount,
    orderBy: sortByNewest,
    select: {
      id: true,
      name: true,
      prefix: true,
      createdAt: true,
      revokedAt: true
    }
  });
};

/////////////////////////////////// Third service ///////////////////////////////////
export const revokeKey = async (accountId: string, keyId: string) => {
    const keyParams = { 
        id: keyId, 
        accountId: accountId 
    };

    const revokeData = { 
        revokedAt: new Date() 
    };

    // Update in the database
    return await prisma.apiKey.update({
        where: keyParams,
        data: revokeData,
        select: {
            id: true,
            accountId: true,
            name: true,
            prefix: true,
            createdAt: true,
            revokedAt: true
        }
    });

};
