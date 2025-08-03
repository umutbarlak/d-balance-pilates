import mongoose, { Schema, Document } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  category: string;
  subcategory?: string;
  image?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    category: { type: String, required: true },
    subcategory: { type: String },
    image: { type: String },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

PageSchema.index({ category: 1 });

export default mongoose.models.Page ||
  mongoose.model<IPage>("Page", PageSchema);
