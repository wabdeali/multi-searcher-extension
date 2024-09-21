import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type SearchFormProps = {
  setSubmittedSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchForm: React.FC<SearchFormProps> = ({
  setSubmittedSearchValue,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!chrome.storage) return;
    chrome.storage.local.get(["submittedSearchValue"]).then((result) => {
      if (result.submittedSearchValue) {
        setSubmittedSearchValue(result.submittedSearchValue);
        setSearchValue(result.submittedSearchValue);
      }
    });
    setTimeout(() => inputRef.current?.select(), 100);
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmittedSearchValue(searchValue);
    if (!chrome.storage) return;
    chrome.storage.local.set({ submittedSearchValue: searchValue });
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-4 mt-8">
      <Input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        ref={inputRef}
      />
      <Button type="submit">Search</Button>
    </form>
  );
};
