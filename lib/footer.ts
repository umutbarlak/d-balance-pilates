// /app/api/footer-links/route.ts
import Page from "@/lib/models/Page";
import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const getFooterLinks = async () => {
  await dbConnect();

  const grouped = await Page.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: "$category",
        pages: {
          $push: {
            title: "$title",
            slug: "$slug",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        pages: 1,
      },
    },
    { $sort: { category: 1 } },
  ]);
  console.log(grouped[0].pages);
  return grouped;
};
