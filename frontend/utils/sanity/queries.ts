import { defineQuery } from "next-sanity";

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    heroType,
    heroHeading,
    heroImage,
    heroColor,
    content
  }
`);

export const NAVIGATION_QUERY = defineQuery(`
  *[_type == "navigation" && title == $title][0]{
    items[]{
      label,
      type,
      externalUrl,
      sectionId,
      internalLink->{
        "slug": slug.current,
        _type
      }
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    ...,
    socialLinks[]{
      platform,
      url
    }
  }
`);
