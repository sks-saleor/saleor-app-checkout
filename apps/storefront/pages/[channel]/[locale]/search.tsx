import { useQueryState } from "next-usequerystate";
import React, { ReactElement } from "react";
import { useDebounce } from "react-use";

import { Layout, ProductCollection } from "@/components";
import { ProductFilterInput } from "@/saleor/api";

function SearchPage() {
  const [searchQuery] = useQueryState("q");
  const [debouncedFilter, setDebouncedFilter] = React.useState<ProductFilterInput>({});

  useDebounce(
    () => {
      if (searchQuery) {
        setDebouncedFilter({ search: searchQuery });
      } else {
        setDebouncedFilter({});
      }
    },
    1000,
    [searchQuery]
  );

  return (
    <main className="container w-full px-8 my-5 min-h-[calc(100vh-250px)]">
      <ProductCollection filter={debouncedFilter} />
    </main>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
