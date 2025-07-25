// lib/blog.ts
import { IPage } from "@/app/dynamic/[...slug]/page";
import Page from "./models/Page";
import dbConnect from "./mongodb";
import Blog from "@/lib/models/Blog";

export async function getPageBySlug(slug: string) {
  await dbConnect();
  const blog = await Page.findOne({ slug, isPublished: true }).lean<IPage>();
  return blog;
}

export async function getRelatedPages(
  category: string,
  currentBlogId: string,
  limit: number = 3
) {
  await dbConnect();
  const pages = await Page.find({
    category,
    _id: { $ne: currentBlogId },
    isPublished: true,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return pages;
}
