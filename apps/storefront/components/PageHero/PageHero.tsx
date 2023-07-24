import { ChipButton } from "@saleor/ui-kit";
import React from "react";
import { RichText } from "../RichText";
import { Breadcrumb } from "./Breadcrumb";
import { BreadcrumbProps } from "./types";
export interface PageHeroProps {
  title: string;
  description?: string;
  pills?: {
    label: string;
    onClick: () => void;
  }[];
  breadcrumbs?: BreadcrumbProps[];
}

export function PageHero({ title, description, pills = [], breadcrumbs = [] }: PageHeroProps) {
  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="sm:text-left mt-8">
        <h1 className="text-5xl font-bold mb-4" data-testid={`titleOf${title}`}>
          {title}
        </h1>
        {description && (
          <div className="text-lg inline-block sm:block my-6 text-main-1">
            <RichText jsonStringData={description} />
          </div>
        )}
        {pills.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {pills.map((pill) => (
              <ChipButton key={pill.label} label={pill.label} onClick={pill.onClick} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default PageHero;
