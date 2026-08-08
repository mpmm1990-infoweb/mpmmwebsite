import { defineType, defineField } from "sanity";

export const globalSettings = defineType({
  name: "globalSettings",
  title: "সাইট সেটিংস (সম্পূর্ণ ওয়েবসাইটের সেটিংস)",
  type: "document",
  description: "এখান থেকে সম্পূর্ণ ওয়েবসাইটের মূল সেটিংস পরিবর্তন করতে পারবেন — সাইটের নাম, লোগো, নেভিগেশন মেনু, ফুটার টেক্সট, যোগাযোগ তথ্য এবং সোশ্যাল মিডিয়া লিংক।",
  fields: [
    defineField({
      name: "siteTitle",
      title: "সাইটের নাম — ইংরেজি (নেভিবারে লোগোর পাশে দেখাবে)",
      type: "string",
      description: "ওয়েবসাইটের উপরের নেভিগেশন বারে লোগোর পাশে এই ইংরেজি নামটি দেখাবে। এছাড়া ব্রাউজার ট্যাবেও দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteTitleBn",
      title: "সাইটের নাম — বাংলা (নেভিবারে লোগোর পাশে দেখাবে)",
      type: "string",
      description: "ওয়েবসাইটের উপরের নেভিগেশন বারে লোগোর পাশে এই বাংলা নামটি দেখাবে।",
    }),
    defineField({
      name: "siteDescription",
      title: "সাইটের বিবরণ — SEO (গুগল সার্চে দেখাবে)",
      type: "text",
      rows: 3,
      description: "এই বিবরণটি গুগল সার্চ রেজাল্টে ওয়েবসাইটের নামের নিচে দেখাবে। সংক্ষিপ্ত ও আকর্ষণীয় করে লিখুন।",
    }),
    defineField({
      name: "logo",
      title: "সাইটের লোগো (নেভিবারে গোলাকার আকারে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "এই লোগোটি ওয়েবসাইটের উপরের নেভিগেশন বারে বাম দিকে গোলাকার আকারে দেখাবে।",
    }),
    defineField({
      name: "ogImage",
      title: "ডিফল্ট শেয়ার ছবি — Open Graph (ফেসবুক/হোয়াটসঅ্যাপে শেয়ার করলে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "ওয়েবসাইটের লিংক ফেসবুক, হোয়াটসঅ্যাপ বা অন্য কোথাও শেয়ার করলে এই ছবিটি প্রিভিউ হিসেবে দেখাবে।",
    }),
    defineField({
      name: "navLinks",
      title: "নেভিগেশন মেনু (ওয়েবসাইটের উপরের মেনু আইটেম)",
      type: "array",
      description: "ওয়েবসাইটের উপরের নেভিগেশন বারের মেনু আইটেমগুলো এখানে সেট করুন। খালি রাখলে ডিফল্ট মেনু দেখাবে।",
      of: [
        {
          type: "object",
          name: "navLink",
          title: "মেনু আইটেম",
          fields: [
            defineField({
              name: "label",
              title: "মেনুর নাম — ইংরেজি (নেভিবারে দেখাবে)",
              type: "string",
              description: "নেভিগেশন মেনুতে এই ইংরেজি নামটি দেখাবে। উদাহরণ: Home, About Us, Videos",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "labelBn",
              title: "মেনুর নাম — বাংলা (নেভিবারে দেখাবে)",
              type: "string",
              description: "নেভিগেশন মেনুতে বাংলায় এই নামটি দেখাবে। উদাহরণ: হোম, আমাদের সম্পর্কে, ভিডিও",
            }),
            defineField({
              name: "href",
              title: "লিংক URL (ক্লিক করলে কোন পেজে যাবে)",
              type: "string",
              description: "মেনু আইটেমে ক্লিক করলে কোন পেজে যাবে তার পাথ। উদাহরণ: /, /history, /videos, /books",
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
      title: "ফুটার টেক্সট — ইংরেজি (ওয়েবসাইটের নিচে দেখাবে)",
      type: "text",
      rows: 2,
      description: "ওয়েবসাইটের একদম নিচের ফুটারে বাম দিকে এই ইংরেজি লেখাটি দেখাবে।",
    }),
    defineField({
      name: "footerTextBn",
      title: "ফুটার টেক্সট — বাংলা (ওয়েবসাইটের নিচে দেখাবে)",
      type: "text",
      rows: 2,
      description: "ওয়েবসাইটের একদম নিচের ফুটারে বাম দিকে এই বাংলা লেখাটি দেখাবে।",
    }),
    defineField({
      name: "contactEmail",
      title: "যোগাযোগ ইমেইল (ফুটারের যোগাযোগ সেকশনে দেখাবে)",
      type: "string",
      description: "ফুটারের 'যোগাযোগ' কলামে ইমেইল আইকন সহ এই ইমেইল ঠিকানাটি দেখাবে। ক্লিক করলে ইমেইল অ্যাপ খুলবে।",
    }),
    defineField({
      name: "contactPhone",
      title: "যোগাযোগ ফোন নম্বর (ফুটারের যোগাযোগ সেকশনে দেখাবে)",
      type: "string",
      description: "ফুটারের 'যোগাযোগ' কলামে ফোন আইকন সহ এই নম্বরটি দেখাবে। ক্লিক করলে ফোন অ্যাপ খুলবে।",
    }),
    defineField({
      name: "address",
      title: "ঠিকানা — ইংরেজি (ফুটারের যোগাযোগ সেকশনে দেখাবে)",
      type: "text",
      rows: 2,
      description: "ফুটারের 'যোগাযোগ' কলামে ম্যাপ আইকন সহ এই ইংরেজি ঠিকানাটি দেখাবে।",
    }),
    defineField({
      name: "addressBn",
      title: "ঠিকানা — বাংলা (ফুটারের যোগাযোগ সেকশনে দেখাবে)",
      type: "text",
      rows: 2,
      description: "ফুটারের 'যোগাযোগ' কলামে ম্যাপ আইকন সহ এই বাংলা ঠিকানাটি দেখাবে।",
    }),
    defineField({
      name: "facebookUrl",
      title: "ফেসবুক পেজ লিংক (ফুটারে ফেসবুক আইকন বাটনে দেখাবে)",
      type: "url",
      description: "ফুটারে একটি গোলাকার ফেসবুক বাটন দেখাবে। ক্লিক করলে এই লিংকে যাবে।",
    }),
    defineField({
      name: "youtubeUrl",
      title: "ইউটিউব চ্যানেল লিংক (ফুটারে ইউটিউব আইকন বাটনে দেখাবে)",
      type: "url",
      description: "ফুটারে একটি গোলাকার ইউটিউব বাটন দেখাবে। ক্লিক করলে এই লিংকে যাবে।",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
  },
});
