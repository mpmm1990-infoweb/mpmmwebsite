import { defineType, defineField } from "sanity";

export const foundingMember = defineType({
  name: "foundingMember",
  title: "প্রতিষ্ঠাতা ও পরিচালনা পর্ষদ (Founding Committee Members)",
  type: "document",
  description:
    "প্রতিষ্ঠাতা ও পরিচালনা পর্ষদের সদস্যদের তথ্য এখানে যোগ করুন। এই তথ্য হোমপেজের 'প্রতিষ্ঠাতা ও পরিচালনা পর্ষদ' সেকশনে দেখাবে।",
  fields: [
    defineField({
      name: "name",
      title: "নাম — ইংরেজি",
      type: "string",
      description: "সদস্যের পূর্ণ নাম ইংরেজিতে।",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameBn",
      title: "নাম — বাংলা",
      type: "string",
      description: "সদস্যের পূর্ণ নাম বাংলায়।",
    }),
    defineField({
      name: "designation",
      title: "পদবি / ডেজিগনেশন — ইংরেজি",
      type: "string",
      description: "সদস্যের পদবি বা ভূমিকা ইংরেজিতে। উদাহরণ: Founder & Super Admin, Executive Member",
    }),
    defineField({
      name: "designationBn",
      title: "পদবি / ডেজিগনেশন — বাংলা",
      type: "string",
      description: "সদস্যের পদবি বা ভূমিকা বাংলায়। উদাহরণ: প্রতিষ্ঠাতা ও সুপার অ্যাডমিন",
    }),
    defineField({
      name: "image",
      title: "ছবি (প্রোফাইল ফটো)",
      type: "image",
      options: { hotspot: true },
      description: "সদস্যের প্রোফাইল ছবি। গোলাকার ফ্রেমে দেখাবে।",
    }),
    defineField({
      name: "bio",
      title: "সংক্ষিপ্ত পরিচিতি — ইংরেজি",
      type: "text",
      rows: 4,
      description: "সদস্যের সংক্ষিপ্ত পরিচিতি বা জীবনী ইংরেজিতে।",
    }),
    defineField({
      name: "bioBn",
      title: "সংক্ষিপ্ত পরিচিতি — বাংলা",
      type: "text",
      rows: 4,
      description: "সদস্যের সংক্ষিপ্ত পরিচিতি বা জীবনী বাংলায়।",
    }),
    defineField({
      name: "isSuperAdmin",
      title: "Is Super Admin / Founder? (প্রতিষ্ঠাতা ও সুপার অ্যাডমিন?)",
      type: "boolean",
      description:
        "এটি চেক করলে এই সদস্যকে হোমপেজের শীর্ষে 'হিরো স্পটলাইট' হিসেবে প্রদর্শন করা হবে। শুধুমাত্র একজনকে চেক করুন।",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "প্রদর্শন ক্রম",
      type: "number",
      description: "ছোট সংখ্যা দিলে আগে দেখাবে। সুপার অ্যাডমিন সবসময় শীর্ষে থাকবেন।",
    }),
  ],
  orderings: [
    {
      title: "প্রদর্শন ক্রম অনুযায়ী",
      name: "orderAsc",
      by: [
        { field: "isSuperAdmin", direction: "desc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "designation",
      media: "image",
      isSuperAdmin: "isSuperAdmin",
    },
    prepare({ title, subtitle, media, isSuperAdmin }) {
      return {
        title: isSuperAdmin ? `⭐ ${title}` : title || "নামবিহীন সদস্য",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
