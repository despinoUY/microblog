import { NextRequest, NextResponse } from "next/server";
import prisma from '_lib/prisma/db';

export const GET = async (
    req: NextRequest
) => {
    const post = await prisma.post.findMany();

    return NextResponse.json({ post });
};