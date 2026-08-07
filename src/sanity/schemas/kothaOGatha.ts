import { defineType, defineField } from "sanity";

export const kothaOGatha = defineType({
  name: "kothaOGatha",
  title: "কথা ও গাথা (Words & Verses)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Officer Name (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "Officer Name (Bangla)",
      type: "string",
    }),
    defineField({
      name: "designation",
      title: "Designation / Rank (English)",
      type: "string",
    }),
    defineField({
      name: "designationBn",
      title: "Designation / Rank (Bangla)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "কবিতা (Poem)", value: "poem" },
          { title: "গল্প (Story)", value: "story" },
          { title: "স্মৃতিগাথা (Reminiscence)", value: "reminiscence" },
          { title: "অন্যান্য (Other)", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "Title (Bangla)",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Full Content (English)",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "contentBn",
      title: "Full Content (Bangla)",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "photo",
      title: "Officer Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Submitter Email",
      type: "string",
    }),
    defineField({
      name: "isApproved",
      title: "Approved for Display",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submission Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "titleBn",
      subtitle: "nameBn",
      media: "photo",
    },
  },
});
