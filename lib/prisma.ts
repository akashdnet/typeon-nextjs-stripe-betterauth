import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});


// checking prisma connection throw ping command for mongodb
// (async function main() {
//     const result = await prisma.$runCommandRaw({ ping: 1 });
//     // const user = await prisma.user.findMany(); //suggestion working
//     console.log(`\nMongoDB connected: `, result);
//     await prisma.$disconnect();
// })()
