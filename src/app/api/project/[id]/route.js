import { NextResponse } from "next/server";
import Projects from "../../../../model/project-model";
import connectDB from "../../../../lib/db";
import { auth } from "../../../../lib/auth/auth";
import { headers } from "next/headers";

export async function GET(req, { params }) {
  //   const session = await auth.api.getSession({
  //     headers: await headers(),
  //   });
  //   const user=session?.user;

  const { id } = await params;
  console.log(id);
  if (!id)
    return NextResponse.json(
      {
        messsage: "Please authorize first",
        success: false,
      },
      {
        status: 401,
      },
    );
  try {
    await connectDB();

    const projects = await Projects.find({ user: id });
    
    return NextResponse.json({
      data: projects,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error,
      success: false,
    });
  }
}
