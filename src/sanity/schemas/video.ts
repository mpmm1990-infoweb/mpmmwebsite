import { defineType, defineField } from "sanity";

export const video = defineType({
  name: "video",
  title: "ভিডিও আর্কাইভ (ভিডিও পেজ)",
  type: "document",
  description: "এখানে ইউটিউব ভিডিও যোগ করুন। এই ভিডিওগুলো ওয়েবসাইটের 'ভিডিও' পেজে এবং হোমপেজের ভিডিও প্রিভিউ সেকশনে দেখাবে।",
  fields: [
    defineField({
      name: "title",
      title: "ভিডিওর শিরোনাম — ইংরেজি (ভিডিও কার্ডে দেখাবে)",
      type: "string",
      description: "এই শিরোনামটি ওয়েবসাইটের ভিডিও কার্ডে ইংরেজিতে দেখাবে। উদাহরণ: Training Ceremony 1990",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "ভিডিওর শিরোনাম — বাংলা (ভিডিও কার্ডে দেখাবে)",
      type: "string",
      description: "এই শিরোনামটি ওয়েবসাইটের ভিডিও কার্ডে বাংলায় দেখাবে। উদাহরণ: প্রশিক্ষণ অনুষ্ঠান ১৯৯০",
    }),
    defineField({
      name: "youtubeUrl",
      title: "ইউটিউব লিংক (ভিডিও চালানোর জন্য)",
      type: "url",
      description: "ইউটিউব ভিডিওর সম্পূর্ণ লিংক দিন। উদাহরণ: https://www.youtube.com/watch?v=XXXXX",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "কাস্টম থাম্বনেইল ছবি (ঐচ্ছিক — ভিডিও কার্ডের কভার ছবি)",
      type: "image",
      options: { hotspot: true },
      description: "এই ছবিটি ভিডিও কার্ডে কভার ছবি হিসেবে দেখাবে। দেওয়া না হলে ইউটিউবের নিজস্ব থাম্বনেইল ব্যবহার হবে।",
    }),
    defineField({
      name: "description",
      title: "ভিডিওর বিবরণ — ইংরেজি (ভিডিও কার্ডে দেখাবে)",
      type: "text",
      rows: 3,
      description: "ভিডিও কার্ডে শিরোনামের নিচে এই ইংরেজি বিবরণটি ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "descriptionBn",
      title: "ভিডিওর বিবরণ — বাংলা (ভিডিও কার্ডে দেখাবে)",
      type: "text",
      rows: 3,
      description: "ভিডিও কার্ডে শিরোনামের নিচে এই বাংলা বিবরণটি ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "publishedAt",
      title: "প্রকাশের তারিখ (কখন ভিডিওটি প্রকাশিত হয়েছে)",
      type: "datetime",
      description: "ভিডিওটি কবে প্রকাশিত বা আপলোড হয়েছে সেই তারিখ। সাজানোর জন্য ব্যবহৃত হয়।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (ওয়েবসাইটে কত নম্বরে দেখাবে)",
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
      title: "প্রকাশের তারিখ অনুযায়ী (নতুন আগে)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "youtubeUrl",
    },
  },
});
