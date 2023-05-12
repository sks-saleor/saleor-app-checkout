import { PhotographIcon } from "@heroicons/react/outline";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";
import { formatAsMoney } from "@/lib/util";

interface ProductProps extends ProductCardFragment {
  defaultVariant: any;
}
export interface ProductCardProps {
  product: ProductProps;
}

const getCardSecondaryDescription = (product: ProductCardFragment) => {
  const artistAttribute = product.attributes.find(
    (attribute) => attribute.attribute.slug === "artist"
  );
  const mainValue = artistAttribute?.values[0];
  if (mainValue?.name) {
    return mainValue.name;
  }
  if (product.category) {
    return translate(product.category, "name");
  }
  return "";
};

export function ProductCard({ product }: ProductCardProps) {
  const paths = usePaths();
  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product.media?.find((media) => media.type === "IMAGE")?.url;
  const price = product?.defaultVariant?.pricing?.price?.gross;

  return (
    <li key={product.id} className="w-full">
      <Link
        href={paths.products._slug(product.slug).$url()}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <a href="pass">
          <div className="bg-main active:bg-brand w-full aspect-1">
            <div className="bg-white w-full h-full relative object-contain ">
              {thumbnailUrl ? (
                <Image src={thumbnailUrl} width={512} height={512} />
              ) : (
                <div className="grid justify-items-center content-center h-full w-full">
                  <PhotographIcon className="h-10 w-10 content-center" />
                </div>
              )}
            </div>
          </div>
          <p
            className="block mt-2 text-md font-extrabold text-main truncate"
            data-testid={`productName${product.name}`}
          >
            {translate(product, "name")}
          </p>
          {secondaryDescription && (
            <p className="block text-md font-normal text-main underline mt-1.5">
              {secondaryDescription}
            </p>
          )}
          {price?.amount && (
            <h2 className="text-md font-bold tracking-tight text-gray-800 mt-1.5">
              {formatAsMoney(price?.amount, price?.currency)}
            </h2>
          )}
        </a>
      </Link>
    </li>
  );
}
