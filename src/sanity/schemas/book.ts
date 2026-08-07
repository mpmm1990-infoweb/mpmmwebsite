import { defineType, defineField } from "sanity";

export const book = defineType({
  name: "book",
  title: "Digital Library (Books/PDFs)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "Title (Bangla)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "descriptionBn",
      title: "Description (Bangla)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "price",
      title: "Price (BDT)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "isFree",
      title: "Is Free?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description:
        "Upload the PDF here for free books. For paid books, upload to Supabase Storage instead.",
    }),
    defineField({
      name: "supabasePdfPath",
      title: "Supabase PDF Storage Path",
      type: "string",
      description:
        "For paid books: the path to the PDF in Supabase Storage (e.g., 'books/my-book.pdf')",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "publishYear",
      title: "Publish Year",
      type: "string",
    }),
    defineField({
      name: "pageCount",
      title: "Page Count",
      type: "number",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 0 ? "Free" : `৳${subtitle}`,
        media,
      };
    },
  },
});
