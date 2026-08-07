import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  titleBn?: string;
  subtitle?: string;
  subtitleBn?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  titleBn,
  subtitle,
  subtitleBn,
  centered = true,
}: SectionHeadingProps) {
  return (
    <ScrollReveal className={`mb-10 sm:mb-14 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white gold-underline pb-4 leading-tight drop-shadow-md">
        <span className="lang-en-only font-heading">{title}</span>
        <span className="lang-bn-only font-heading">{titleBn || title}</span>
      </h2>
      {subtitle && (
        <p
          className={`mt-5 sm:mt-7 text-sm sm:text-base md:text-lg max-w-2xl font-heading text-[#C2CFC8] ${
            centered ? "mx-auto" : ""
          }`}
        >
          <span className="lang-en-only">{subtitle}</span>
          <span className="lang-bn-only">{subtitleBn || subtitle}</span>
        </p>
      )}
    </ScrollReveal>
  );
}
