import { defineType, defineField } from "sanity";

export const book = defineType({
  name: "book",
  title: "ডিজিটাল লাইব্রেরি — বই/পিডিএফ (লাইব্রেরি পেজ)",
  type: "document",
  description: "এখানে বই বা পিডিএফ যোগ করুন। এগুলো ওয়েবসাইটের 'লাইব্রেরি' পেজে কার্ড আকারে দেখাবে এবং ক্লিক করলে বিস্তারিত পেজ খুলবে।",
  fields: [
    defineField({
      name: "title",
      title: "বইয়ের শিরোনাম — ইংরেজি (বই কার্ড ও বিস্তারিত পেজে দেখাবে)",
      type: "string",
      description: "এই শিরোনামটি লাইব্রেরি পেজের বই কার্ডে এবং বইয়ের বিস্তারিত পেজে ইংরেজিতে দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleBn",
      title: "বইয়ের শিরোনাম — বাংলা (বই কার্ড ও বিস্তারিত পেজে দেখাবে)",
      type: "string",
      description: "এই শিরোনামটি লাইব্রেরি পেজের বই কার্ডে এবং বইয়ের বিস্তারিত পেজে বাংলায় দেখাবে।",
    }),
    defineField({
      name: "slug",
      title: "স্লাগ / URL পাথ (বইয়ের পেজের ওয়েব ঠিকানা)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "এটি বইয়ের নিজস্ব পেজের ওয়েব ঠিকানা তৈরি করে। 'Generate' বাটনে ক্লিক করলে স্বয়ংক্রিয়ভাবে তৈরি হবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "বইয়ের কভার ছবি (বই কার্ডে ও বিস্তারিত পেজে দেখাবে)",
      type: "image",
      options: { hotspot: true },
      description: "এই ছবিটি লাইব্রেরি পেজে বই কার্ডের কভার হিসেবে এবং বিস্তারিত পেজে বড় আকারে দেখাবে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "বইয়ের বিবরণ — ইংরেজি (বিস্তারিত পেজে দেখাবে)",
      type: "text",
      rows: 4,
      description: "বইয়ের বিস্তারিত পেজে কভার ছবির পাশে এই ইংরেজি বিবরণটি দেখাবে।",
    }),
    defineField({
      name: "descriptionBn",
      title: "বইয়ের বিবরণ — বাংলা (বিস্তারিত পেজে দেখাবে)",
      type: "text",
      rows: 4,
      description: "বইয়ের বিস্তারিত পেজে কভার ছবির পাশে এই বাংলা বিবরণটি দেখাবে।",
    }),
    defineField({
      name: "price",
      title: "বইয়ের মূল্য — টাকায় (বই কার্ড ও বিস্তারিত পেজে দেখাবে)",
      type: "number",
      description: "বইয়ের দাম টাকায় লিখুন। ফ্রি হলে 0 লিখুন এবং নিচের 'ফ্রি কিনা' অপশনটি চালু করুন।",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "isFree",
      title: "ফ্রি কিনা? (চালু করলে বিনামূল্যে ডাউনলোড হবে)",
      type: "boolean",
      initialValue: false,
      description: "এটি চালু করলে ওয়েবসাইটে 'ফ্রি' ব্যাজ দেখাবে এবং সরাসরি পিডিএফ ডাউনলোড বাটন আসবে।",
    }),
    defineField({
      name: "pdfFile",
      title: "পিডিএফ ফাইল আপলোড (PDF Upload)",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "সরাসরি পিডিএফ ফাইল আপলোড করতে চাইলে এখানে দিন।",
    }),
    defineField({
      name: "externalLink",
      title: "বইয়ের ড্রাইভ/ডাউনলোড লিংক (Drive/External Link)",
      type: "url",
      description: "যদি পিডিএফ ফাইল বড় হয় এবং আপনি গুগল ড্রাইভ বা অন্য কোনো লিংক দিতে চান, তবে এখানে পেস্ট করুন। (নোট: ফাইল আপলোড না করে শুধু লিংক দিলেও অটোমেটিক কাস্টমারের কাছে এই লিংক চলে যাবে)।",
    }),
    defineField({
      name: "author",
      title: "লেখকের নাম (বই কার্ড ও বিস্তারিত পেজে দেখাবে)",
      type: "string",
      description: "বইয়ের লেখকের নাম। এটি বই কার্ডে সোনালী রঙে এবং বিস্তারিত পেজে দেখাবে।",
    }),
    defineField({
      name: "publishYear",
      title: "প্রকাশের সাল (বিস্তারিত পেজে 'প্রকাশকাল' ব্যাজে দেখাবে)",
      type: "string",
      description: "বইটি কোন সালে প্রকাশিত হয়েছে। বিস্তারিত পেজে 'প্রকাশকাল' ব্যাজে দেখাবে।",
    }),
    defineField({
      name: "pageCount",
      title: "মোট পৃষ্ঠা সংখ্যা (বিস্তারিত পেজে 'পৃষ্ঠা' ব্যাজে দেখাবে)",
      type: "number",
      description: "বইয়ের মোট পৃষ্ঠা সংখ্যা। বিস্তারিত পেজে 'পৃষ্ঠা' ব্যাজে দেখাবে।",
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম (লাইব্রেরি পেজে কত নম্বরে দেখাবে)",
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 0 ? "ফ্রি" : `৳${subtitle}`,
        media,
      };
    },
  },
});
