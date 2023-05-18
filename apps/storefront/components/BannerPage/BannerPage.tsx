import React from "react";
import { usePageBannerQuery } from "@/saleor/api";
import Image from "next/legacy/image";

export const BannerPage = () => {
  const { data } = usePageBannerQuery({ variables: { slug: "banner_home" } });
  const attributes = data?.page?.attributes;
  if (!attributes?.length) return null;
  let url = null;
  for (const value of attributes[0].values) {
    if (value.file?.url) {
      url = value.file.url;
      break;
    }
  }
  if (!url) return null;

  return (
    <div className="w-full block min-h-[491px] h-full relative mb-10">
      <Image src={url} alt="Banner" layout="fill" />
    </div>
  );
};

export default BannerPage;
