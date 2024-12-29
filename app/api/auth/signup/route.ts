import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json();

    //validation
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          error: "Missing required field",
        },
        { status: 400 }
      );
    }

    //if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role as "ADMIN" | "MODERATOR" | "USER",
      },
    });

    //remove password from Response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Error creating user",
      },
      { status: 500 }
    );
  }
}
