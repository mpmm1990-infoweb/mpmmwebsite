import { defineType, defineField } from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteTitleBn",
      title: "Site Title (Bangla)",
      type: "string",
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description (SEO)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "Nav Link",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "labelBn",
              title: "Label (Bangla)",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "footerTextBn",
      title: "Footer Text (Bangla)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "addressBn",
      title: "Address (Bangla)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Channel URL",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
