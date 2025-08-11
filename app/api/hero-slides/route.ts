import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import HeroSlide from "@/lib/models/HeroSlide";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const id = request.nextUrl.searchParams.get("id");

    console.log(id);

    if (id) {
      const slide = await HeroSlide.findById(id);
      if (!slide) {
        return NextResponse.json({ error: "Slide not found" }, { status: 404 });
      }
      return NextResponse.json(slide);
    } else {
      const slides = await HeroSlide.find({ isActive: true }).sort({
        order: 1,
      });
      return NextResponse.json(slides);
    }
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await req.json();
    const updated = await HeroSlide.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Slide not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update slide" },
      { status: 500 }
    );
  }
}
