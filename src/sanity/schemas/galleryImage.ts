import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "গ্যালারি ছবি (গ্যালারি পেজ)",
  type: "document",
  description: "এখানে গ্যালারির ছবি যোগ করুন। এই ছবিগুলো ওয়েবসাইটের 'গ্যালারি' পেজে সুন্দরভাবে গ্রিড আকারে সাজানো থাকবে এবং ক্লিক করলে বড় আকারে দেখা যাবে।",
  fields: [
    defineField({
      name: "image",
      title: "ছবি (গ্যালারি পেজে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "গ্যালারি পেজে এই ছবিটি একটি কার্ডের মধ্যে দেখাবে। ভালো মানের ছবি আপলোড করুন।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "ক্যাপশন — ইংরেজি (ছবির উপর হোভার করলে দেখাবে)",
      type: "string",
      description: "মাউস ছবির উপর নিলে বা ছবিতে ক্লিক করলে এই ইংরেজি ক্যাপশনটি দেখাবে।",
    }),
    defineField({
      name: "captionBn",
      title: "ক্যাপশন — বাংলা (ছবির উপর হোভার করলে দেখাবে)",
      type: "string",
      description: "মাউস ছবির উপর নিলে বা ছবিতে ক্লিক করলে এই বাংলা ক্যাপশনটি দেখাবে।",
    }),
    defineField({
      name: "year",
      title: "সাল (ছবিটি কোন সালের)",
      type: "string",
      description: "ছবিটি কোন সালে তোলা হয়েছে তা লিখুন। গ্যালারি সাজানোর জন্য ব্যবহৃত হয়।",
    }),
    defineField({
      name: "category",
      title: "ক্যাটাগরি (ছবির ধরন — ফিল্টার করার জন্য)",
      type: "string",
      options: {
        list: [
          { title: "অনুষ্ঠান (Events)", value: "events" },
          { title: "প্রশিক্ষণ (Training)", value: "training" },
          { title: "পুনর্মিলনী (Reunions)", value: "reunions" },
          { title: "আনুষ্ঠানিক অনুষ্ঠান (Ceremonies)", value: "ceremonies" },
          { title: "ঐতিহাসিক (Historical)", value: "historical" },
          { title: "অন্যান্য (Other)", value: "other" },
        ],
      },
      description: "ছবিটি কোন ধরনের তা বেছে নিন। এটি গ্যালারি পেজে ফিল্টার করতে সাহায্য করে।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (গ্যালারি পেজে কত নম্বরে দেখাবে)",
      type: "number",
      description: "ছোট সংখ্যা দিলে আগে দেখাবে, বড় সংখ্যা দিলে পরে দেখাবে। উদাহরণ: 1, 2, 3...",
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
      return {
        title: title || "শিরোনামবিহীন ছবি",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
