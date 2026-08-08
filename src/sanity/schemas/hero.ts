import { defineType, defineField } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "হিরো সেকশন (ওয়েবসাইটের প্রথম দৃশ্য)",
  type: "document",
  description: "এই সেকশনটি ওয়েবসাইটে প্রবেশ করলে সবার আগে দেখা যায়। এখানে বড় ব্যাকগ্রাউন্ড ছবি, শিরোনাম, উপশিরোনাম এবং একটি বাটন থাকে।",
  fields: [
    defineField({
      name: "title",
      title: "শিরোনাম — ইংরেজি (হিরো সেকশনে বড় অক্ষরে দেখাবে)",
      type: "string",
      description: "এখানে যা লিখবেন তা ওয়েবসাইটের একদম শুরুতে বড় অক্ষরে ইংরেজিতে দেখাবে। উদাহরণ: Modern Police Memorial Museum",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "শিরোনাম — বাংলা (হিরো সেকশনে বড় অক্ষরে দেখাবে)",
      type: "string",
      description: "এখানে যা লিখবেন তা ওয়েবসাইটের একদম শুরুতে বড় অক্ষরে বাংলায় দেখাবে। উদাহরণ: আধুনিক পুলিশ স্মৃতি জাদুঘর",
    }),
    defineField({
      name: "subtitle",
      title: "উপশিরোনাম — ইংরেজি (শিরোনামের নিচে সোনালি রঙে দেখাবে)",
      type: "string",
      description: "মূল শিরোনামের ঠিক নিচে ছোট আকারে সোনালী রঙে এই লেখাটি দেখাবে। উদাহরণ: First Batch — 1990",
    }),
    defineField({
      name: "subtitleBn",
      title: "উপশিরোনাম — বাংলা (শিরোনামের নিচে সোনালি রঙে দেখাবে)",
      type: "string",
      description: "মূল শিরোনামের ঠিক নিচে ছোট আকারে সোনালী রঙে এই বাংলা লেখাটি দেখাবে। উদাহরণ: প্রথম ব্যাচ — ১৯৯০",
    }),
    defineField({
      name: "backgroundImage",
      title: "ব্যাকগ্রাউন্ড ছবি — একটি (পুরো স্ক্রিনের পেছনে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "এই ছবিটি হিরো সেকশনের পুরো পেছনে ব্যাকগ্রাউন্ড হিসেবে দেখাবে। যদি একাধিক ছবি দিতে চান তাহলে নিচের 'স্লাইডশো ছবি' ব্যবহার করুন।",
    }),
    defineField({
      name: "bgImages",
      title: "স্লাইডশো ছবি — একাধিক (পর্যায়ক্রমে বদলাবে)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "এখানে একাধিক ছবি যোগ করলে সেগুলো ওয়েবসাইটের হিরো সেকশনে পর্যায়ক্রমে ধীরে ধীরে পরিবর্তন হবে (স্লাইডশো)।",
    }),
    defineField({
      name: "badgeImage",
      title: "ব্যাজ / প্রতীক ছবি (শিরোনামের উপরে গোল লোগো)",
      type: "image",
      options: { hotspot: true },
      description: "এই ছবিটি হিরো সেকশনে শিরোনামের ঠিক উপরে গোলাকার আকারে সোনালী বর্ডার সহ দেখাবে। সাধারণত এটি ব্যাচের লোগো বা প্রতীক হয়।",
    }),
    defineField({
      name: "ctaText",
      title: "বাটনের লেখা — ইংরেজি (লাল বাটনে দেখাবে)",
      type: "string",
      description: "হিরো সেকশনের নিচের দিকে লাল রঙের বাটনে এই ইংরেজি লেখাটি দেখাবে। উদাহরণ: Explore Our History",
    }),
    defineField({
      name: "ctaTextBn",
      title: "বাটনের লেখা — বাংলা (লাল বাটনে দেখাবে)",
      type: "string",
      description: "হিরো সেকশনের নিচের দিকে লাল রঙের বাটনে এই বাংলা লেখাটি দেখাবে। উদাহরণ: আমাদের ঐতিহ্য উন্মোচন করুন",
    }),
    defineField({
      name: "ctaLink",
      title: "বাটনের লিংক (বাটনে ক্লিক করলে কোথায় যাবে)",
      type: "string",
      description: "লাল বাটনে ক্লিক করলে ব্যবহারকারী কোন পেজে যাবে তা এখানে লিখুন। উদাহরণ: /history",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
