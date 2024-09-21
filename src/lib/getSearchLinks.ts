import { searchEngines } from "./searchEngines";

export type SearchLinks = { name: string; url: string }[];

export function getSearchLinks(searchValue: string): SearchLinks {
  const searchLinks: SearchLinks = [];

  for (const [key, value] of Object.entries(searchEngines)) {
    searchLinks.push({
      name: key.toUpperCase(),
      url: `${value}${encodeURIComponent(searchValue)}`,
    });
  }

  return searchLinks;
}
