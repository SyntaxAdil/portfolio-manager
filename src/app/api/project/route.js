import { NextResponse } from "next/server";
import Projects from "../../../model/project-model";
import connectDB from "../../../lib/db";
import { auth } from "../../../lib/auth/auth";
import { headers } from "next/headers";
import mongoose from "mongoose";

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const body = await req.json();

    const newProject = await Projects.create({
      ...body,
      user: user.id,
    });

    return NextResponse.json({
      success: true,
      message: "Done",
      data: newProject,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const body = await req.json();

    const { _id, ...updateData } = body;

    const updateProject = await Projects.findByIdAndUpdate(
      _id,
      {
        ...updateData,
        user: user.id,
      },
      { new: true },
    );

    return NextResponse.json({
      success: true,
      message: "Done",
      data: updateProject,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const body = await req.json();

    const { _id } = body;

    const deletedProject = await Projects.findOneAndDelete({
      _id,
      user: user.id,
    });

    if (!deletedProject) {
      return NextResponse.json(
        {
          success: false,
          message: "Project not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project Removed Successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}