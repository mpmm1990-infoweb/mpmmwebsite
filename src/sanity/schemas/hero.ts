import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
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
      name: "subtitle",
      title: "Subtitle (English)",
      type: "string",
    }),
    defineField({
      name: "subtitleBn",
      title: "Subtitle (Bangla)",
      type: "string",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (Single / Default)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bgImages",
      title: "Background Image Slideshow (Multiple)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Add multiple images for a smooth cross-fade slideshow background.",
    }),
    defineField({
      name: "badgeImage",
      title: "Badge / Emblem Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ctaText",
      title: "Call-to-Action Text (English)",
      type: "string",
    }),
    defineField({
      name: "ctaTextBn",
      title: "Call-to-Action Text (Bangla)",
      type: "string",
    }),
    defineField({
      name: "ctaLink",
      title: "Call-to-Action Link",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
