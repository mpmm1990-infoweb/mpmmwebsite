import { defineType, defineField } from "sanity";

export const history = defineType({
  name: "history",
  title: "আমাদের সম্পর্কে (About Us পেজ)",
  type: "document",
  description: "এই সেকশনে ব্যাচের ইতিহাস, পরিচয় এবং টাইমলাইন রয়েছে। এই তথ্য ওয়েবসাইটের 'আমাদের সম্পর্কে' পেজে এবং হোমপেজের প্রিভিউ সেকশনে দেখাবে।",
  fields: [
    defineField({
      name: "title",
      title: "শিরোনাম — ইংরেজি (পেজের উপরে বড় অক্ষরে দেখাবে)",
      type: "string",
      description: "আমাদের সম্পর্কে পেজের একদম উপরে এই ইংরেজি শিরোনামটি বড় করে দেখাবে। উদাহরণ: Our History",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "শিরোনাম — বাংলা (পেজের উপরে বড় অক্ষরে দেখাবে)",
      type: "string",
      description: "আমাদের সম্পর্কে পেজের একদম উপরে এই বাংলা শিরোনামটি বড় করে দেখাবে। উদাহরণ: আমাদের ইতিহাস",
    }),
    defineField({
      name: "excerpt",
      title: "সংক্ষিপ্ত বিবরণ — ইংরেজি (হোমপেজের প্রিভিউতে দেখাবে)",
      type: "text",
      rows: 3,
      description: "এই ছোট বিবরণটি ওয়েবসাইটের হোমপেজে 'আমাদের সম্পর্কে' প্রিভিউ সেকশনে ইংরেজিতে দেখাবে। ২-৩ লাইনে লিখুন।",
    }),
    defineField({
      name: "excerptBn",
      title: "সংক্ষিপ্ত বিবরণ — বাংলা (হোমপেজের প্রিভিউতে দেখাবে)",
      type: "text",
      rows: 3,
      description: "এই ছোট বিবরণটি ওয়েবসাইটের হোমপেজে 'আমাদের সম্পর্কে' প্রিভিউ সেকশনে বাংলায় দেখাবে। ২-৩ লাইনে লিখুন।",
    }),
    defineField({
      name: "body",
      title: "সম্পূর্ণ বিবরণ (আমাদের সম্পর্কে পেজের মূল লেখা)",
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
              title: "ছবির ক্যাপশন (ছবির নিচে ছোট বর্ণনা)",
            },
          ],
        },
      ],
      description: "এখানে বিস্তারিত লেখা, ছবি সব যোগ করতে পারবেন। এটি আমাদের সম্পর্কে পেজে সম্পূর্ণ আকারে দেখাবে।",
    }),
    defineField({
      name: "coverImage",
      title: "কভার ছবি (পেজের উপরের ব্যাকগ্রাউন্ড)",
      type: "image",
      options: { hotspot: true },
      description: "এই ছবিটি আমাদের সম্পর্কে পেজের একদম উপরে ব্যানার/ব্যাকগ্রাউন্ড হিসেবে হালকাভাবে দেখাবে।",
    }),
    defineField({
      name: "timeline",
      title: "টাইমলাইন ঘটনাসমূহ (সময়রেখা — পেজের নিচের দিকে)",
      type: "array",
      description: "এখানে গুরুত্বপূর্ণ ঘটনাবলী সাল অনুযায়ী যোগ করুন। এগুলো আমাদের সম্পর্কে পেজে একটি সুন্দর উল্লম্ব সময়রেখায় দেখাবে।",
      of: [
        {
          type: "object",
          name: "timelineEvent",
          title: "টাইমলাইনের ঘটনা",
          fields: [
            defineField({
              name: "year",
              title: "সাল (টাইমলাইনের গোলাকার ব্যাজে দেখাবে)",
              type: "string",
              description: "এই সালটি টাইমলাইনের গোলাকার সোনালী ব্যাজের ভেতরে দেখাবে। উদাহরণ: 1990",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "ঘটনার শিরোনাম — ইংরেজি (টাইমলাইন কার্ডে দেখাবে)",
              type: "string",
              description: "এই শিরোনামটি টাইমলাইনের প্রতিটি কার্ডে ইংরেজিতে বড় অক্ষরে দেখাবে।",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "titleBn",
              title: "ঘটনার শিরোনাম — বাংলা (টাইমলাইন কার্ডে দেখাবে)",
              type: "string",
              description: "এই শিরোনামটি টাইমলাইনের প্রতিটি কার্ডে বাংলায় বড় অক্ষরে দেখাবে।",
            }),
            defineField({
              name: "description",
              title: "ঘটনার বিবরণ — ইংরেজি (শিরোনামের নিচে দেখাবে)",
              type: "text",
              rows: 3,
              description: "টাইমলাইন কার্ডে শিরোনামের নিচে এই ইংরেজি বিবরণটি ছোট অক্ষরে দেখাবে।",
            }),
            defineField({
              name: "descriptionBn",
              title: "ঘটনার বিবরণ — বাংলা (শিরোনামের নিচে দেখাবে)",
              type: "text",
              rows: 3,
              description: "টাইমলাইন কার্ডে শিরোনামের নিচে এই বাংলা বিবরণটি ছোট অক্ষরে দেখাবে।",
            }),
            defineField({
              name: "image",
              title: "ঘটনার ছবি (টাইমলাইন কার্ডে দেখাবে)",
              type: "image",
              options: { hotspot: true },
              description: "এই ছবিটি টাইমলাইন কার্ডে বিবরণের নিচে দেখাবে। ঐচ্ছিক।",
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
