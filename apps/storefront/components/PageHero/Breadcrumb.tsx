import React from "react";
import { BreadcrumbProps } from "./types";
import Link from "next/link";

interface IProps {
  breadcrumbs: BreadcrumbProps[];
}
export const Breadcrumb: React.FC<IProps> = ({ breadcrumbs = [] }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((breadcrumb, index, arrs) => {
          if (index === 0) {
            return (
              <li className="inline-flex items-center">
                <Link href={breadcrumb.link || ""} passHref legacyBehavior>
                  <a
                    href="pass"
                    className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600"
                  >
                    {breadcrumb.label}
                  </a>
                </Link>
              </li>
            );
          }
          if (arrs.length - 1 === index) {
            return (
              <li aria-current="page">
                <div className="flex items-center">
                  <ArrowIcon />
                  <span className="ml-1 text-base font-medium text-gray-500 md:ml-2">
                    {breadcrumb.label}
                  </span>
                </div>
              </li>
            );
          }
          return (
            <li key={index}>
              <div className="flex items-center">
                <ArrowIcon />
                <Link href={breadcrumb.link || ""} passHref legacyBehavior>
                  <a
                    href="pass"
                    className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {breadcrumb.label}
                  </a>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const ArrowIcon = () => {
  return (
    <svg
      className="w-3 h-3 text-gray-400 mx-1"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
};
