import { defineType, defineField } from "sanity";

export const welfareFund = defineType({
  name: "welfareFund",
  title: "ওয়েলফেয়ার ফান্ড (Welfare Fund)",
  type: "document",
  description: "ওয়েলফেয়ার ফান্ডের সর্বমোট প্রাপ্ত অনুদান এবং কল্যাণমূলক কাজের ব্যয়ের হিসাব।",
  fields: [
    defineField({
      name: "totalCollection",
      title: "সর্বমোট প্রাপ্ত অনুদান / Total Collection",
      type: "number",
      description: "সর্বমোট প্রাপ্ত অনুদানের পরিমাণ (টাকায়)",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "totalExpense",
      title: "মোট ব্যয় / Total Expense",
      type: "number",
      description: "কল্যাণমূলক কাজে মোট ব্যয়ের পরিমাণ (টাকায়)",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      totalCollection: "totalCollection",
      totalExpense: "totalExpense",
    },
    prepare({ totalCollection = 0, totalExpense = 0 }) {
      const balance = totalCollection - totalExpense;
      return {
        title: "ওয়েলফেয়ার ফান্ড ব্যালেন্স",
        subtitle: `আদায়: ৳${totalCollection.toLocaleString()} | ব্যয়: ৳${totalExpense.toLocaleString()} | উদ্বৃত্ত: ৳${balance.toLocaleString()}`,
      };
    },
  },
});
