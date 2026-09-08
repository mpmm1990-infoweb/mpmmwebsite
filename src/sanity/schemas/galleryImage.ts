import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "গ্যালারি ছবি (গ্যালারি পেজ)",
  type: "document",
  description:
    "এখানে গ্যালারির ছবি যোগ করুন। এই ছবিগুলো ওয়েবসাইটের 'গ্যালারি' পেজে এবং হোমপেজে সুন্দরভাবে সাজানো থাকবে।",
  fields: [
    defineField({
      name: "image",
      title: "ছবি (গ্যালারি পেজে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description:
        "গ্যালারি পেজে এই ছবিটি একটি কার্ডের মধ্যে দেখাবে। ভালো মানের ছবি আপলোড করুন।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "গ্যালারি বিভাগ / Gallery Category",
      type: "string",
      options: {
        list: [
          {
            title: "৯০-এর স্মৃতি অ্যালবাম (90s Photos)",
            value: "90s_photos",
          },
          {
            title: "গ্রুপ অ্যাক্টিভিটিস (Group Activities)",
            value: "group_activities",
          },
          {
            title: "সামাজিক কার্যক্রম (Social Works)",
            value: "social_works",
          },
        ],
        layout: "radio",
      },
      initialValue: "90s_photos",
      description:
        "ছবিটির ক্যাটাগরি নির্বাচন করুন। সঠিক ক্যাটাগরি নির্বাচন করলে গ্যালারি পেজে সঠিক ট্যাবে দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "ক্যাপশন — ইংরেজি (ছবির উপর হোভার করলে দেখাবে)",
      type: "string",
      description:
        "মাউস ছবির উপর নিলে বা ছবিতে ক্লিক করলে এই ইংরেজি ক্যাপশনটি দেখাবে।",
    }),
    defineField({
      name: "captionBn",
      title: "ক্যাপশন — বাংলা (ছবির উপর হোভার করলে দেখাবে)",
      type: "string",
      description:
        "মাউস ছবির উপর নিলে বা ছবিতে ক্লিক করলে এই বাংলা ক্যাপশনটি দেখাবে।",
    }),
    defineField({
      name: "year",
      title: "সাল (ছবিটি কোন সালের)",
      type: "string",
      description:
        "ছবিটি কোন সালে তোলা হয়েছে তা লিখুন। গ্যালারি সাজানোর জন্য ব্যবহৃত হয়।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (গ্যালারি পেজে কত নম্বরে দেখাবে)",
      type: "number",
      description:
        "ছোট সংখ্যা দিলে আগে দেখাবে, বড় সংখ্যা দিলে পরে দেখাবে। উদাহরণ: 1, 2, 3...",
    }),
  ],
  orderings: [
    {
      title: "প্রদর্শন ক্রম অনুযায়ী",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "সাল অনুযায়ী (নতুন আগে)",
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
      const categoryTitle =
        subtitle === "90s_photos"
          ? "৯০-এর স্মৃতি অ্যালবাম"
          : subtitle === "group_activities"
          ? "গ্রুপ অ্যাক্টিভিটিস"
          : subtitle === "social_works"
          ? "সামাজিক কার্যক্রম"
          : subtitle || "";

      return {
        title: title || "শিরোনামবিহীন ছবি",
        subtitle: categoryTitle,
        media,
      };
    },
  },
});
