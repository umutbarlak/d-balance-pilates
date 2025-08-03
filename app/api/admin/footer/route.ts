import dbConnect from "@/lib/mongodb";
import FooterSection from "@/lib/models/FooterSection"; // Mongoose modeli

export async function GET() {
  await dbConnect();
  const sections = await FooterSection.find().sort({ order: 1 });
  return Response.json(sections);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const created = await FooterSection.create(body);
  return Response.json(created);
}
