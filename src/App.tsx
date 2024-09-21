import { useState } from "react";
import "./App.css";
import { SearchForm } from "./components/SearchForm";
import { TypographyH1 } from "./components/ui/Typography";
import { SearchResults } from "./components/SearchResults";

function App() {
  const [submittedSearchValue, setSubmittedSearchValue] = useState("");

  return (
    <main>
      <div className="text=center min-w-[500px]">
        <TypographyH1>Multi Search</TypographyH1>
        <SearchForm setSubmittedSearchValue={setSubmittedSearchValue} />
        {submittedSearchValue ? (
          <SearchResults submittedSearchValue={submittedSearchValue} />
        ) : null}
      </div>
    </main>
  );
}

export default App;
