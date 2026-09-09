// All GROQ queries centralized for maintainability

export const GLOBAL_SETTINGS_QUERY = `*[_type == "globalSettings"][0]{
  siteTitle,
  siteTitleBn,
  siteDescription,
  logo,
  favicon{
    asset->{
      url
    }
  },
  ogImage,
  navLinks[]{
    label,
    labelBn,
    href
  },
  footerText,
  footerTextBn,
  contactEmail,
  contactPhone,
  address,
  addressBn,
  facebookUrl,
  youtubeUrl,
  footerAdminName,
  footerAdminNameBn,
  footerAdminTitle,
  footerAdminTitleBn,
  footerAdminImage,
  footerAdminBio,
  footerAdminBioBn
}`;

export const HERO_QUERY = `*[_type == "hero"][0]{
  title,
  titleBn,
  subtitle,
  subtitleBn,
  backgroundImage,
  bgImages,
  badgeImage,
  ctaText,
  ctaTextBn,
  ctaLink
}`;

export const HISTORY_QUERY = `*[_type == "history"][0]{
  title,
  titleBn,
  excerpt,
  excerptBn,
  body,
  coverImage,
  timeline[]{
    year,
    title,
    titleBn,
    description,
    descriptionBn,
    image
  }
}`;

export const VIDEOS_QUERY = `*[_type == "video"] | order(order asc, publishedAt desc){
  _id,
  title,
  titleBn,
  youtubeUrl,
  thumbnail,
  description,
  descriptionBn,
  publishedAt,
  order
}`;

export const VIDEOS_PREVIEW_QUERY = `*[_type == "video"] | order(order asc, publishedAt desc)[0...3]{
  _id,
  title,
  titleBn,
  youtubeUrl,
  thumbnail,
  description,
  descriptionBn
}`;

export const BOOKS_QUERY = `*[_type == "book"] | order(order asc){
  _id,
  title,
  titleBn,
  slug,
  coverImage,
  description,
  descriptionBn,
  price,
  isFree,
  externalLink,
  "pdfUrl": pdfFile.asset->url,
  author,
  publishYear,
  pageCount,
  order
}`;

export const BOOKS_PREVIEW_QUERY = `*[_type == "book"] | order(order asc)[0...3]{
  _id,
  title,
  titleBn,
  slug,
  coverImage,
  price,
  isFree,
  externalLink,
  "pdfUrl": pdfFile.asset->url,
  author
}`;

export const BOOK_BY_SLUG_QUERY = `*[_type == "book" && slug.current == $slug][0]{
  _id,
  title,
  titleBn,
  slug,
  coverImage,
  description,
  descriptionBn,
  price,
  isFree,
  externalLink,
  "pdfUrl": pdfFile.asset->url,
  pdfFile{
    asset->{url}
  },
  author,
  publishYear,
  pageCount
}`;

export const RELATED_BOOKS_QUERY = `*[_type == "book" && slug.current != $slug] | order(order asc)[0...4]{
  _id,
  title,
  titleBn,
  slug,
  coverImage,
  price,
  isFree,
  externalLink,
  "pdfUrl": pdfFile.asset->url,
  author
}`;

export const GALLERY_QUERY = `*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  caption,
  captionBn,
  year,
  category,
  order
}`;

export const GALLERY_PREVIEW_QUERY = `*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  caption,
  captionBn,
  year,
  category
}`;

export const KOTHA_O_GATHA_QUERY = `*[_type == "kothaOGatha" && isApproved != false] | order(order asc, submittedAt desc){
  _id,
  name,
  nameBn,
  designation,
  designationBn,
  category,
  title,
  content,
  photo,
  submittedAt,
  order
}`;

export const KOTHA_O_GATHA_PREVIEW_QUERY = `*[_type == "kothaOGatha" && isApproved != false] | order(order asc, submittedAt desc)[0...10]{
  _id,
  name,
  nameBn,
  designation,
  designationBn,
  category,
  title,
  content,
  photo
}`;

export const WELFARE_FUND_QUERY = `*[_type == "welfareFund"][0]{
  totalCollection,
  totalExpense
}`;

export const FOUNDING_MEMBERS_QUERY = `*[_type == "foundingMember"] | order(isSuperAdmin desc, order asc){
  _id,
  name,
  nameBn,
  designation,
  designationBn,
  image,
  bio,
  bioBn,
  isSuperAdmin,
  order
}`;
