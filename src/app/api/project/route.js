import { NextResponse } from "next/server";
import Projects from "../../../model/project-model";
import connectDB from "../../../lib/db";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newProject = await Projects.create(body);

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
