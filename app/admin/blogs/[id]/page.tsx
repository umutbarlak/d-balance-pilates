import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import EditBlogForm from "@/components/ui/editBlog";

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();

  const blog = await Blog.findById(params.id).lean();

  if (!blog || Array.isArray(blog)) return notFound();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Blog Yazısını Düzenle
      </h1>
      <p className="text-gray-600 mb-6">Mevcut blog yazısını güncelleyin</p>
      <EditBlogForm
        initialData={JSON.parse(
          JSON.stringify({ ...blog, id: (blog as any)._id })
        )}
      />
    </div>
  );
}
