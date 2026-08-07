import { defineType, defineField } from "sanity";

export const history = defineType({
  name: "history",
  title: "History",
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
      name: "excerpt",
      title: "Short Excerpt (for Homepage preview)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "excerptBn",
      title: "Short Excerpt (Bangla)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Full Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "timeline",
      title: "Timeline Events",
      type: "array",
      of: [
        {
          type: "object",
          name: "timelineEvent",
          title: "Timeline Event",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Event Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "titleBn",
              title: "Event Title (Bangla)",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "descriptionBn",
              title: "Description (Bangla)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Event Image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "year",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
