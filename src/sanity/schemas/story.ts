import { defineType, defineField } from "sanity";

export const story = defineType({
  name: "story",
  title: "Police Journeys & Stories",
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
      title: "Rank / Designation (English)",
      type: "string",
    }),
    defineField({
      name: "designationBn",
      title: "Rank / Designation (Bangla)",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Story / Journey Content (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contentBn",
      title: "Story / Journey Content (Bangla)",
      type: "text",
      rows: 4,
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
      title: "nameBn",
      subtitle: "designationBn",
      media: "photo",
    },
  },
});
