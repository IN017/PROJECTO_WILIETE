import "dotenv/config";
import {PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3';
import {PrismaClient} from '../generated/prisma/client.js';

const conexaobanco = `${process.env.DATABASE_URL}`;


const adapter = new PrismaBetterSqlite3({ url: conexaobanco });
const prisma = new PrismaClient({ adapter });

export {prisma};