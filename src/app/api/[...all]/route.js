//catching all other routes

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: 404,
    message: "No matching route",
  });
}

export async function POST() {
  return NextResponse.json({
    status: 404,
    message: "No matching route",
  });
}

export async function DELETE() {
  return NextResponse.json({
    status: 404,
    message: "No matching route",
  });
}

export async function PATCH() {
  return NextResponse.json({
    status: 404,
    message: "No matching route",
  });
}

export async function PUT() {
  return NextResponse.json({
    status: 404,
    message: "No matching route",
  });
}
