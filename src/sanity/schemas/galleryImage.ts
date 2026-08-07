import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption (English)",
      type: "string",
    }),
    defineField({
      name: "captionBn",
      title: "Caption (Bangla)",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Events", value: "events" },
          { title: "Training", value: "training" },
          { title: "Reunions", value: "reunions" },
          { title: "Ceremonies", value: "ceremonies" },
          { title: "Historical", value: "historical" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "caption",
      subtitle: "category",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Photo",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
