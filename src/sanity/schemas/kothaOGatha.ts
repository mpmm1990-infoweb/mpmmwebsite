import { defineType, defineField } from "sanity";

export const kothaOGatha = defineType({
  name: "kothaOGatha",
  title: "কথা ও গাথা (কবিতা, গল্প ও স্মৃতিচারণ)",
  type: "document",
  description: "এখানে সদস্যদের কবিতা, গল্প, স্মৃতিচারণ বা অন্যান্য সাহিত্যকর্ম যোগ করুন। এগুলো ওয়েবসাইটের 'কথা ও গাথা' সেকশনে মারকি (স্ক্রলিং) আকারে দেখাবে এবং ক্লিক করলে পপআপে বিস্তারিত পড়া যাবে।",
  fields: [
    defineField({
      name: "name",
      title: "লেখকের নাম — ইংরেজি (কথা ও গাথা কার্ডে দেখাবে)",
      type: "string",
      description: "লেখকের পূর্ণ নাম ইংরেজিতে। কথা ও গাথা কার্ডে নামের জায়গায় দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "লেখকের নাম — বাংলা (কথা ও গাথা কার্ডে দেখাবে)",
      type: "string",
      description: "লেখকের পূর্ণ নাম বাংলায়। বাংলা ভাষায় কার্ডে এই নামটি দেখাবে।",
    }),
    defineField({
      name: "designation",
      title: "পদবি / পদমর্যাদা — ইংরেজি (নামের নিচে দেখাবে)",
      type: "string",
      description: "লেখকের পদবি বা পদমর্যাদা ইংরেজিতে। কার্ডে নামের নিচে ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "designationBn",
      title: "পদবি / পদমর্যাদা — বাংলা (নামের নিচে দেখাবে)",
      type: "string",
      description: "লেখকের পদবি বা পদমর্যাদা বাংলায়। কার্ডে নামের নিচে ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "category",
      title: "ক্যাটাগরি (লেখার ধরন — ফিল্টার করার জন্য)",
      type: "string",
      options: {
        list: [
          { title: "কবিতা (Poem)", value: "poem" },
          { title: "গল্প (Story)", value: "story" },
          { title: "স্মৃতিগাথা (Reminiscence)", value: "reminiscence" },
          { title: "অন্যান্য (Other)", value: "other" },
        ],
      },
      description: "লেখাটি কোন ধরনের তা বেছে নিন — কবিতা, গল্প, স্মৃতিচারণ বা অন্যান্য।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "লেখার শিরোনাম — ইংরেজি (কার্ডে ও পপআপে দেখাবে)",
      type: "string",
      description: "কবিতা/গল্প/স্মৃতিচারণের শিরোনাম ইংরেজিতে। কার্ডে এবং পপআপে বড় অক্ষরে দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "লেখার শিরোনাম — বাংলা (কার্ডে ও পপআপে দেখাবে)",
      type: "string",
      description: "কবিতা/গল্প/স্মৃতিচারণের শিরোনাম বাংলায়। কার্ডে এবং পপআপে বড় অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "content",
      title: "সম্পূর্ণ লেখা — ইংরেজি (পপআপে বিস্তারিত দেখাবে)",
      type: "text",
      rows: 8,
      description: "কবিতা/গল্প/স্মৃতিচারণের সম্পূর্ণ লেখা ইংরেজিতে। কার্ডে ক্লিক করলে পপআপে এই সম্পূর্ণ লেখা দেখাবে।",
    }),
    defineField({
      name: "contentBn",
      title: "সম্পূর্ণ লেখা — বাংলা (পপআপে বিস্তারিত দেখাবে)",
      type: "text",
      rows: 8,
      description: "কবিতা/গল্প/স্মৃতিচারণের সম্পূর্ণ লেখা বাংলায়। কার্ডে ক্লিক করলে পপআপে এই সম্পূর্ণ লেখা দেখাবে।",
    }),
    defineField({
      name: "photo",
      title: "লেখকের ছবি (কার্ডে ও পপআপে প্রোফাইল ছবি দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "লেখকের ছবি আপলোড করুন। কার্ডে এবং পপআপে প্রোফাইল ছবি হিসেবে দেখাবে।",
    }),
    defineField({
      name: "email",
      title: "জমাদানকারীর ইমেইল (শুধুমাত্র অভ্যন্তরীণ ব্যবহারের জন্য)",
      type: "string",
      description: "যিনি লেখাটি জমা দিয়েছেন তার ইমেইল ঠিকানা। এটি ওয়েবসাইটে দেখাবে না, শুধু রেকর্ডের জন্য।",
    }),
    defineField({
      name: "isApproved",
      title: "অনুমোদিত কিনা? (চালু থাকলে ওয়েবসাইটে দেখাবে)",
      type: "boolean",
      initialValue: true,
      description: "এটি বন্ধ করলে লেখাটি ওয়েবসাইটে দেখাবে না। অনুমোদন দিতে চালু করুন।",
    }),
    defineField({
      name: "submittedAt",
      title: "জমা দেওয়ার তারিখ (স্বয়ংক্রিয়ভাবে সেট হয়)",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "লেখাটি কখন জমা দেওয়া হয়েছে। স্বয়ংক্রিয়ভাবে আজকের তারিখ সেট হয়।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (ওয়েবসাইটে কত নম্বরে দেখাবে)",
      type: "number",
      description: "ছোট সংখ্যা দিলে আগে দেখাবে, বড় সংখ্যা দিলে পরে দেখাবে। উদাহরণ: 1, 2, 3...",
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
