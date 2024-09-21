import { useEffect, useState } from "react";
import { TypographyH2 } from "./ui/Typography";
import { getSearchLinks, SearchLinks } from "@/lib/getSearchLinks";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export const SearchResults: React.FC<{
  submittedSearchValue: string;
}> = ({ submittedSearchValue }) => {
  const [searchLinks, setSearchLinks] = useState<SearchLinks>([]);

  useEffect(() => {
    const newSearchLinks = getSearchLinks(submittedSearchValue);
    setSearchLinks(newSearchLinks);
  }, [submittedSearchValue]);

  function openAll() {
    searchLinks.forEach((searchLink) => {
      chrome.tabs.create({ url: searchLink.url, active: false });
    });
  }

  return (
    <div className="mt-8 text-left">
      <div className="flex justify-between">
        <TypographyH2>Results</TypographyH2>
        <Button onClick={openAll}>Open All</Button>
      </div>
      <p>For {submittedSearchValue}</p>
      <div className="mt-8">
        {searchLinks.map((searchLink) => (
          <Button
            className="text-lg font-semibold mb-4 flex gap-2 items-center"
            onClick={() => {
              chrome.tabs.create({ url: searchLink.url, active: false });
            }}
            key={searchLink.name}
          >
            {searchLink.name}
            <OpenInNewWindowIcon className="text-white" />
          </Button>
        ))}
      </div>
    </div>
  );
};
