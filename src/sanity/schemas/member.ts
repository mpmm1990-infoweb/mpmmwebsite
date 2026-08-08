import { defineType, defineField } from "sanity";

export const member = defineType({
  name: "member",
  title: "বিশিষ্ট সদস্যবৃন্দ (সদস্য সেকশন)",
  type: "document",
  description: "এখানে ব্যাচের বিশিষ্ট সদস্যদের তথ্য যোগ করুন। এগুলো ওয়েবসাইটের সদস্য প্রদর্শনী সেকশনে কার্ড আকারে দেখাবে।",
  fields: [
    defineField({
      name: "name",
      title: "সদস্যের নাম — ইংরেজি (সদস্য কার্ডে দেখাবে)",
      type: "string",
      description: "সদস্যের পূর্ণ নাম ইংরেজিতে। সদস্য কার্ডে বড় অক্ষরে দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "সদস্যের নাম — বাংলা (সদস্য কার্ডে দেখাবে)",
      type: "string",
      description: "সদস্যের পূর্ণ নাম বাংলায়। বাংলা ভাষা সিলেক্ট করলে সদস্য কার্ডে এই নামটি দেখাবে।",
    }),
    defineField({
      name: "photo",
      title: "সদস্যের ছবি (সদস্য কার্ডে গোলাকার/আয়তাকার ছবি দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "সদস্যের ছবি আপলোড করুন। এটি সদস্য কার্ডে প্রোফাইল ছবি হিসেবে দেখাবে।",
    }),
    defineField({
      name: "rank",
      title: "পদবি / পদমর্যাদা — ইংরেজি (সদস্য কার্ডে নামের নিচে দেখাবে)",
      type: "string",
      description: "সদস্যের পদবি বা পদমর্যাদা ইংরেজিতে। উদাহরণ: DIG, SP, ASP ইত্যাদি।",
    }),
    defineField({
      name: "rankBn",
      title: "পদবি / পদমর্যাদা — বাংলা (সদস্য কার্ডে নামের নিচে দেখাবে)",
      type: "string",
      description: "সদস্যের পদবি বা পদমর্যাদা বাংলায়। উদাহরণ: ডিআইজি, এসপি, এএসপি ইত্যাদি।",
    }),
    defineField({
      name: "batchYear",
      title: "ব্যাচের সাল (সদস্য কোন ব্যাচের)",
      type: "string",
      initialValue: "1990",
      description: "সদস্যটি কোন ব্যাচের তা লিখুন। সাধারণত 1990।",
    }),
    defineField({
      name: "bio",
      title: "সংক্ষিপ্ত জীবনী — ইংরেজি (সদস্য কার্ডে দেখাবে)",
      type: "text",
      rows: 4,
      description: "সদস্যের সংক্ষিপ্ত জীবনী বা পরিচিতি ইংরেজিতে। ৩-৪ লাইনে লিখুন।",
    }),
    defineField({
      name: "bioBn",
      title: "সংক্ষিপ্ত জীবনী — বাংলা (সদস্য কার্ডে দেখাবে)",
      type: "text",
      rows: 4,
      description: "সদস্যের সংক্ষিপ্ত জীবনী বা পরিচিতি বাংলায়। ৩-৪ লাইনে লিখুন।",
    }),
    defineField({
      name: "isDeceased",
      title: "মৃত কিনা? (চালু করলে কার্ডে বিশেষ চিহ্ন দেখাবে)",
      type: "boolean",
      initialValue: false,
      description: "সদস্য যদি মৃত হয়ে থাকেন তাহলে এটি চালু করুন। কার্ডে বিশেষ শ্রদ্ধাঞ্জলি চিহ্ন দেখাবে।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (সদস্য সেকশনে কত নম্বরে দেখাবে)",
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
      title: "নাম অনুযায়ী (A-Z)",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "rank",
      media: "photo",
    },
  },
});
