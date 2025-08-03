import HeroSlide from "./models/HeroSlide";
import dbConnect from "./mongodb";

export async function getSlides() {
  await dbConnect();
  const slides = await HeroSlide.find()
    .select("-__v")
    .sort({ order: -1 })
    .lean();

  return slides.map((slide) => ({
    ...slide,
    _id: (slide._id as string | { toString(): string }).toString(),
    createdAt: new Date(slide.createdAt).toISOString(),
    __v: slide.__v ?? 0,
  }));
}
