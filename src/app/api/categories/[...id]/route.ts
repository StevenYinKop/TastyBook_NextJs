import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@pc";
import { Category } from "@prisma/client";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const category = await prisma.category.findFirst({
        where: {
            id: parseInt(params.id)
        },
        include: {
            cuisines: true
        }
    });
    return NextResponse.json(category);
}