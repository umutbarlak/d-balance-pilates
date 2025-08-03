import mongoose, { Schema, model, models } from "mongoose";

const FooterLinkSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  { _id: false } // linklerde ayrı _id oluşturulmasın
);

const FooterSectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    links: {
      type: [FooterLinkSchema],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Tekrar tanımlamayı önlemek için:
const FooterSection =
  models.FooterSection || model("FooterSection", FooterSectionSchema);

export default FooterSection;
