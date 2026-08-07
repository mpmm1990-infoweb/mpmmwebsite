import { defineType, defineField } from "sanity";

export const member = defineType({
  name: "member",
  title: "Prominent Members",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "Name (Bangla)",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rank",
      title: "Rank / Designation",
      type: "string",
    }),
    defineField({
      name: "rankBn",
      title: "Rank / Designation (Bangla)",
      type: "string",
    }),
    defineField({
      name: "batchYear",
      title: "Batch Year",
      type: "string",
      initialValue: "1990",
    }),
    defineField({
      name: "bio",
      title: "Short Biography",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bioBn",
      title: "Short Biography (Bangla)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "isDeceased",
      title: "Is Deceased?",
      type: "boolean",
      initialValue: false,
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
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "rank",
      media: "photo",
    },
  },
});
