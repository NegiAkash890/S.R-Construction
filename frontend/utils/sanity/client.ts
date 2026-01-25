import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url';

export const projectId = "t1lt9uvy";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
export const apiVersion = "2024-01-01";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for fresh data
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
