// lib/blog.ts
import Page from "./models/Page";
import dbConnect from "./mongodb";
import Blog from "@/lib/models/Blog";

export async function getPageBySlug(slug: string) {
  await dbConnect();
  const blog = await Page.findOne({ slug, isPublished: true }).lean();
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
// export async function getRecentBlogs(limit: number = 3) {
//   await dbConnect();
//   const blogs = await Blog.find({ isPublished: true })
//     .sort({ createdAt: -1 })
//     .limit(limit)
//     .lean();
//   return blogs;
// }
// export async function getAllBlogs(limit: number = 10) {
//   await dbConnect();
//   const blogs = await Blog.find({ isPublished: true })
//     .select("-__v,")
//     .sort({ createdAt: -1 })
//     .limit(limit)
//     .lean();
//   return blogs;
// }
