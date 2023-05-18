import { useQueryState } from "next-usequerystate";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import usePaths from "@/lib/paths";

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
        <div className="relative">
          <input
            type="text"
            className="block w-full p-3 pl-6 bg-gray-100 text-md border-0 rounded-[39px] placeholder-[#9E9E9E] focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for products..."
            id="searchQuery"
            spellCheck={false}
            {...registerForm("searchQuery", {
              required: true,
            })}
          />
          <button
            type="submit"
            className="absolute h-full right-0 w-[107px] bottom-0 bg-[#1D87AD] rounded-[39px] flex items-center justify-center hover:bg-[#1d87adeb] focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_14_576)">
                <path
                  d="M23.625 20.97C25.6207 18.303 26.5319 14.979 26.1754 11.6672C25.8188 8.35534 24.2209 5.30151 21.7033 3.12042C19.1857 0.939336 15.9353 -0.207064 12.6065 -0.088011C9.27762 0.0310424 6.11744 1.40671 3.76207 3.76207C1.40671 6.11744 0.0310424 9.27762 -0.088011 12.6065C-0.207064 15.9353 0.939336 19.1857 3.12042 21.7033C5.30151 24.2209 8.35534 25.8188 11.6672 26.1754C14.979 26.5319 18.303 25.6207 20.97 23.625L27.345 30L30 27.35L23.625 20.97ZM13.125 22.5C11.2708 22.5 9.45824 21.9502 7.91652 20.92C6.37481 19.8899 5.1732 18.4257 4.46362 16.7127C3.75405 14.9996 3.5684 13.1146 3.93013 11.296C4.29187 9.47745 5.18475 7.80699 6.49587 6.49587C7.80699 5.18475 9.47745 4.29187 11.296 3.93013C13.1146 3.5684 14.9996 3.75405 16.7127 4.46362C18.4257 5.1732 19.8899 6.37481 20.92 7.91652C21.9502 9.45824 22.5 11.2708 22.5 13.125C22.4977 15.6107 21.5092 17.9939 19.7516 19.7516C17.9939 21.5092 15.6107 22.4977 13.125 22.5Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_14_576">
                  <rect width="30" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
