import { NextRequest, NextResponse } from "next/server";
import prisma from '_lib/prisma/db';

export const GET = async (
    req: NextRequest,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });

    return NextResponse.json({ post });
};

export const DELETE = async (
    req: NextRequest,
    context: { params: { id: string } }
) => {
    const id = Number(context.params.id || 0);

    const post = await prisma.post.delete({
        where:{
            id: id
        }
    });

    return NextResponse.json(post, {status: 200});
}