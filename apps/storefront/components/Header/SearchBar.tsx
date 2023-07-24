import { useQueryState } from "next-usequerystate";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import usePaths from "@/lib/paths";
import styles from "./SearchBar.module.css";
interface SearchFormData {
  searchQuery: string | null | undefined;
}
export const SearchBar = () => {
  const paths = usePaths();
  const [searchQuery] = useQueryState("q");
  const router = useRouter();
  const { register: registerForm, handleSubmit: handleSubmitForm } = useForm<SearchFormData>({
    defaultValues: { searchQuery },
  });

  const handleSubmit = handleSubmitForm(async (formData: SearchFormData) => {
    const params: any = paths.search.$url();
    params.query.q = formData.searchQuery;
    void router.replace(params);
  });

  return (
    <>
      <form className="w-full" method="post" onSubmit={handleSubmit} noValidate>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className={`${styles["search-bar"]} relative`}>
          <input
            type="text"
            className="block w-full p-[30px] h-[74px] text-md border-0 rounded-[100px] placeholder-[#ADADAD] focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for products..."
            id="searchQuery"
            spellCheck={false}
            {...registerForm("searchQuery", {
              required: true,
            })}
          />
          <button
            type="submit"
            className="text-white text-md absolute top-[10px] right-[10px] h-[50px] right-0 w-[140px] bottom-0 bg-indigo-500 hover:bg-indigo-400 rounded-[39px] focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            SEARCH
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
