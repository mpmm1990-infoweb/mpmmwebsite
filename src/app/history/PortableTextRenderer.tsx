"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/image";

interface Block {
  _type: string;
  _key?: string;
  children?: Array<{
    _type: string;
    text?: string;
    marks?: string[];
  }>;
  style?: string;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  asset?: { _ref: string };
  caption?: string;
  listItem?: string;
}

function renderText(
  child: { text?: string; marks?: string[] },
  markDefs: Array<{ _key: string; _type: string; href?: string }> = []
) {
  let text: React.ReactNode = child.text || "";

  if (child.marks) {
    for (const mark of child.marks) {
      if (mark === "strong") {
        text = <strong key={mark}>{text}</strong>;
      } else if (mark === "em") {
        text = <em key={mark}>{text}</em>;
      } else {
        const linkMark = markDefs.find((m) => m._key === mark);
        if (linkMark?.href) {
          text = (
            <a
              key={mark}
              href={linkMark.href}
              className="text-gold underline hover:text-gold-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {text}
            </a>
          );
        }
      }
    }
  }

  return text;
}

export default function PortableTextRenderer({
  value,
}: {
  value: unknown[];
}) {
  if (!value || !Array.isArray(value)) return null;

  const blocks = value as Block[];

  return (
    <div>
      {blocks.map((block, index) => {
        // Image block
        if (block._type === "image" && block.asset) {
          return (
            <figure key={block._key || index} className="my-8">
              <Image
                src={urlFor({ asset: block.asset }).width(800).quality(85).url()}
                alt={block.caption || ""}
                width={800}
                height={500}
                className="w-full h-auto rounded-xl shadow-heritage"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-warm-gray mt-3 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // Text blocks
        if (block._type === "block") {
          const children = block.children?.map((child, childIndex) =>
            child._type === "span" ? (
              <span key={childIndex}>
                {renderText(child, block.markDefs)}
              </span>
            ) : null
          );

          switch (block.style) {
            case "h1":
              return (
                <h1 key={block._key || index} className="text-3xl md:text-4xl">
                  {children}
                </h1>
              );
            case "h2":
              return (
                <h2 key={block._key || index} className="text-2xl md:text-3xl">
                  {children}
                </h2>
              );
            case "h3":
              return (
                <h3 key={block._key || index} className="text-xl md:text-2xl">
                  {children}
                </h3>
              );
            case "h4":
              return (
                <h4 key={block._key || index} className="text-lg md:text-xl">
                  {children}
                </h4>
              );
            case "blockquote":
              return (
                <blockquote
                  key={block._key || index}
                  className="border-l-4 border-gold pl-6 my-6 italic text-navy/70"
                >
                  {children}
                </blockquote>
              );
            default:
              if (block.listItem === "bullet") {
                return (
                  <li key={block._key || index} className="ml-6 list-disc">
                    {children}
                  </li>
                );
              }
              if (block.listItem === "number") {
                return (
                  <li key={block._key || index} className="ml-6 list-decimal">
                    {children}
                  </li>
                );
              }
              return <p key={block._key || index}>{children}</p>;
          }
        }

        return null;
      })}
    </div>
  );
}
