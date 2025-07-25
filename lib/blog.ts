// lib/blog.ts
import dbConnect from "./mongodb";
import Blog from "@/lib/models/Blog";

export async function getBlogBySlug(slug: string) {
  await dbConnect();
  const blog = await Blog.findOne({ slug, isPublished: true }).lean();
  return blog;
}
export async function getRecentBlogs(limit: number = 3) {
  await dbConnect();
  const blogs = await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return blogs.map((blog) => ({
    ...blog,
    _id: (blog._id as string | { toString(): string }).toString(),
    createdAt: new Date(blog.createdAt).toISOString(),
    __v: blog.__v ?? 0, // güvenlik için fallback
  }));
}
export async function getAllBlogs(limit: number = 10) {
  await dbConnect();
  const blogs = await Blog.find({ isPublished: true })
    .select("-__v")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return blogs.map((blog) => ({
    ...blog,
    _id: (blog._id as string | { toString(): string }).toString(),
    createdAt: new Date(blog.createdAt).toISOString(),
    __v: blog.__v ?? 0, // güvenlik için fallback
  }));
}
