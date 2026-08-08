import { defineType, defineField } from "sanity";

export const story = defineType({
  name: "story",
  title: "পুলিশ জীবনের গল্প ও যাত্রা (গল্প সেকশন)",
  type: "document",
  description: "এখানে পুলিশ সদস্যদের জীবনের গল্প, অভিজ্ঞতা ও যাত্রার বিবরণ যোগ করুন। এগুলো ওয়েবসাইটের 'জীবনের গল্প' সেকশনে মারকি (স্ক্রলিং) আকারে দেখাবে।",
  fields: [
    defineField({
      name: "name",
      title: "কর্মকর্তার নাম — ইংরেজি (গল্প কার্ডে দেখাবে)",
      type: "string",
      description: "গল্পকারের পূর্ণ নাম ইংরেজিতে। গল্প কার্ডে নামের জায়গায় দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "কর্মকর্তার নাম — বাংলা (গল্প কার্ডে দেখাবে)",
      type: "string",
      description: "গল্পকারের পূর্ণ নাম বাংলায়। বাংলা ভাষায় গল্প কার্ডে এই নামটি দেখাবে।",
    }),
    defineField({
      name: "designation",
      title: "পদবি / পদমর্যাদা — ইংরেজি (নামের নিচে দেখাবে)",
      type: "string",
      description: "কর্মকর্তার পদবি বা পদমর্যাদা ইংরেজিতে। গল্প কার্ডে নামের নিচে ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "designationBn",
      title: "পদবি / পদমর্যাদা — বাংলা (নামের নিচে দেখাবে)",
      type: "string",
      description: "কর্মকর্তার পদবি বা পদমর্যাদা বাংলায়। গল্প কার্ডে নামের নিচে ছোট অক্ষরে দেখাবে।",
    }),
    defineField({
      name: "content",
      title: "গল্পের বিষয়বস্তু — ইংরেজি (গল্প কার্ডে দেখাবে)",
      type: "text",
      rows: 4,
      description: "কর্মকর্তার জীবনের গল্প বা অভিজ্ঞতা ইংরেজিতে। এটি গল্প কার্ডের মূল লেখা হিসেবে দেখাবে।",
    }),
    defineField({
      name: "contentBn",
      title: "গল্পের বিষয়বস্তু — বাংলা (গল্প কার্ডে দেখাবে)",
      type: "text",
      rows: 4,
      description: "কর্মকর্তার জীবনের গল্প বা অভিজ্ঞতা বাংলায়। এটি গল্প কার্ডের মূল লেখা হিসেবে দেখাবে।",
    }),
    defineField({
      name: "photo",
      title: "কর্মকর্তার ছবি (গল্প কার্ডে প্রোফাইল ছবি দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "কর্মকর্তার ছবি আপলোড করুন। গল্প কার্ডে ছবি হিসেবে দেখাবে।",
    }),
    defineField({
      name: "email",
      title: "জমাদানকারীর ইমেইল (শুধুমাত্র অভ্যন্তরীণ ব্যবহারের জন্য)",
      type: "string",
      description: "যিনি গল্পটি জমা দিয়েছেন তার ইমেইল ঠিকানা। এটি ওয়েবসাইটে দেখাবে না, শুধু রেকর্ডের জন্য।",
    }),
    defineField({
      name: "isApproved",
      title: "অনুমোদিত কিনা? (চালু থাকলে ওয়েবসাইটে দেখাবে)",
      type: "boolean",
      initialValue: true,
      description: "এটি বন্ধ করলে গল্পটি ওয়েবসাইটে দেখাবে না। অনুমোদন দিতে চালু করুন।",
    }),
    defineField({
      name: "submittedAt",
      title: "জমা দেওয়ার তারিখ (স্বয়ংক্রিয়ভাবে সেট হয়)",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "গল্পটি কখন জমা দেওয়া হয়েছে। স্বয়ংক্রিয়ভাবে আজকের তারিখ সেট হয়।",
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
      title: "nameBn",
      subtitle: "designationBn",
      media: "photo",
    },
  },
});
