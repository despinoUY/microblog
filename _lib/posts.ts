import prisma from "./prisma/db";

export default async function getPosts() {
    return await prisma.post.findMany();
}