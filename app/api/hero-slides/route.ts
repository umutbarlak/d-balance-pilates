import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroSlide from "@/lib/models/HeroSlide";

export async function GET() {
  try {
    await dbConnect();

    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });

    return NextResponse.json(slides);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    const slide = new HeroSlide(data);
    await slide.save();

    return NextResponse.json(slide, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create hero slide" },
      { status: 500 }
    );
  }
}
