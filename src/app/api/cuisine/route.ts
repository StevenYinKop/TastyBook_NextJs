import {NextResponse} from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request: Request) {
    const cuisines = await prisma.cuisine.findMany({})
    return NextResponse.json(cuisines, { status: 200 });
}

export async function POST(request: Request) {

}
