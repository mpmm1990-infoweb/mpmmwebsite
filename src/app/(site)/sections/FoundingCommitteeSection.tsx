"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor } from "@/sanity/image";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";

export interface FoundingMember {
  _id: string;
  name?: string;
  nameBn?: string;
  designation?: string;
  designationBn?: string;
  image?: { asset: { _ref: string } };
  bio?: string;
  bioBn?: string;
  isSuperAdmin?: boolean;
  order?: number;
}

interface FoundingCommitteeSectionProps {
  data: FoundingMember[];
}

export default function FoundingCommitteeSection({
  data,
}: FoundingCommitteeSectionProps) {
  const members = data || [];
  const superAdmin = members.find((m) => m.isSuperAdmin === true);
  const otherMembers = members.filter((m) => !m.isSuperAdmin);

  if (members.length === 0) return null;

  return (
    <section
      id="founding-committee"
      className="py-16 sm:py-20 md:py-28 heritage-pattern w-full max-w-full overflow-x-hidden relative"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#006a4e]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Founding Committee"
          titleBn="প্রতিষ্ঠাতা ও পরিচালনা পর্ষদ"
          subtitle="The visionary leaders who built and continue to steward our legacy."
          subtitleBn="যাঁদের দূরদর্শিতা ও নেতৃত্বে আমাদের এই ঐতিহ্যবাহী সংগঠন গড়ে উঠেছে।"
        />

        {/* ── Super Admin Hero Spotlight ── */}
        {superAdmin && (
          <ScrollReveal className="flex justify-center mb-14 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center max-w-xl w-full"
            >
              {/* Outer Gold Ring Glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-2xl scale-125 pointer-events-none" />
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.5)] overflow-hidden bg-[#0B1B3D]">
                  {superAdmin.image?.asset ? (
                    <Image
                      src={urlFor(superAdmin.image)
                        .width(400)
                        .height(400)
                        .quality(90)
                        .url()}
                      alt={superAdmin.nameBn || superAdmin.name || "Founder"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#D4AF37]">
                      <Star size={56} />
                    </div>
                  )}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-heading mb-3 drop-shadow-md">
                <span className="lang-bn-only">
                  {superAdmin.nameBn || superAdmin.name}
                </span>
                <span className="lang-en-only">
                  {superAdmin.name || superAdmin.nameBn}
                </span>
              </h3>

              {/* Glowing Gold Founder Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#F4C430]/20 border border-[#D4AF37]/70 shadow-[0_0_18px_rgba(212,175,55,0.45)] mb-4">
                <Star
                  size={14}
                  className="text-[#D4AF37] fill-[#D4AF37] shrink-0"
                />
                <span className="text-[#D4AF37] font-bold font-heading text-xs sm:text-sm tracking-wide">
                  <span className="lang-bn-only">
                    প্রতিষ্ঠাতা ও সুপার অ্যাডমিন
                  </span>
                  <span className="lang-en-only">Founder & Super Admin</span>
                </span>
                <Star
                  size={14}
                  className="text-[#D4AF37] fill-[#D4AF37] shrink-0"
                />
              </div>

              {/* Designation */}
              {(superAdmin.designation || superAdmin.designationBn) && (
                <p className="text-[#C2CFC8] font-heading text-sm sm:text-base font-medium mb-4">
                  <span className="lang-bn-only">
                    {superAdmin.designationBn || superAdmin.designation}
                  </span>
                  <span className="lang-en-only">
                    {superAdmin.designation || superAdmin.designationBn}
                  </span>
                </p>
              )}

              {/* Bio */}
              {(superAdmin.bio || superAdmin.bioBn) && (
                <p className="text-white/75 text-sm sm:text-base leading-relaxed font-heading max-w-lg">
                  <span className="lang-bn-only">
                    {superAdmin.bioBn || superAdmin.bio}
                  </span>
                  <span className="lang-en-only">
                    {superAdmin.bio || superAdmin.bioBn}
                  </span>
                </p>
              )}
            </motion.div>
          </ScrollReveal>
        )}

        {/* ── Other Members Grid ── */}
        {otherMembers.length > 0 && (
          <>
            {/* Sub-heading */}
            <ScrollReveal className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006a4e]/20 border border-[#006a4e]/40">
                <Users size={14} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs font-bold font-heading tracking-wider uppercase">
                  <span className="lang-bn-only">পরিচালনা পর্ষদের সদস্যবৃন্দ</span>
                  <span className="lang-en-only">Committee Members</span>
                </span>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherMembers.map((member, index) => (
                <ScrollReveal
                  key={member._id}
                  delay={index * 0.06}
                  duration={0.4}
                >
                  <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#0B1B3D]/80 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#132B5E]/70 transition-all duration-300 shadow-lg group cursor-default"
                  >
                    {/* Mini Profile Image or Initials */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D4AF37]/40 group-hover:border-[#D4AF37]/80 overflow-hidden bg-[#060E1F] mb-3 transition-all duration-300 shrink-0">
                      {member.image?.asset ? (
                        <Image
                          src={urlFor(member.image)
                            .width(120)
                            .height(120)
                            .quality(80)
                            .url()}
                          alt={member.nameBn || member.name || "Member"}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#D4AF37] font-bold font-heading text-lg">
                          {(member.name || member.nameBn || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <p className="text-white font-bold font-heading text-sm sm:text-base leading-snug mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                      <span className="lang-bn-only">
                        {member.nameBn || member.name}
                      </span>
                      <span className="lang-en-only">
                        {member.name || member.nameBn}
                      </span>
                    </p>

                    {/* Designation */}
                    {(member.designation || member.designationBn) && (
                      <p className="text-[#94A59B] text-[11px] sm:text-xs font-heading leading-snug">
                        <span className="lang-bn-only">
                          {member.designationBn || member.designation}
                        </span>
                        <span className="lang-en-only">
                          {member.designation || member.designationBn}
                        </span>
                      </p>
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {/* ── Learn More Button ── */}
        <ScrollReveal className="text-center mt-12 sm:mt-16">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2.5 min-h-[48px] px-8 py-3.5 rounded-full font-bold font-heading text-sm sm:text-base text-white bg-gradient-to-r from-[#006a4e] to-[#008764] hover:from-[#008764] hover:to-[#00a87c] shadow-[0_8px_28px_rgba(0,106,78,0.45)] hover:scale-105 transition-all duration-300 group border border-[#D4AF37]/30"
          >
            <span className="lang-bn-only">আরও জানুন</span>
            <span className="lang-en-only">Learn More</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform shrink-0"
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
