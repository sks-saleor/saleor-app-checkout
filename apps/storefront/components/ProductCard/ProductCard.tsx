import { PhotographIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";
import { formatAsMoney } from "@/lib/util";
import styles from "./ProductCard.module.css";
import { Rating } from "../Rating";

export interface ProductCardProps {
  product: ProductCardFragment;
  showAddToCart?: boolean;
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

export function ProductCard({ product, showAddToCart = true }: ProductCardProps) {
  const paths = usePaths();
  const secondaryDescription = getCardSecondaryDescription(product);
  const thumbnailUrl = product.media?.find((media) => media.type === "IMAGE")?.url;
  const price = product?.defaultVariant?.pricing?.price?.gross;
  // console.log("product::: ", product);
  return (
    <li key={product.id} className={`${styles.card} w-full`}>
      <Link
        href={paths.products._slug(product.slug).$url()}
        prefetch={false}
        passHref
        legacyBehavior
      >
        <a href="pass">
          <div className="active:bg-brand aspect-1 w-[146px] m-auto">
            <div className="bg-white relative">
              {thumbnailUrl ? (
                <img src={thumbnailUrl} className="w-full h-[176px] object-contain" />
              ) : (
                <div className="grid justify-items-center content-center h-full w-full">
                  <PhotographIcon className="h-10 w-10 content-center" />
                </div>
              )}
            </div>
          </div>
          <p
            className="block mt-4 text-base truncate text-center max-w-xs mx-auto"
            data-testid={`productName${product.name}`}
          >
            {translate(product, "name")}
          </p>
          {secondaryDescription && (
            <p className="block text-base text-main mt-1.5 text-center">{secondaryDescription}</p>
          )}
          {price?.amount && (
            <p className="text-md font-bold tracking-tight text-gray-800 mt-2 text-center">
              {formatAsMoney(price?.amount, price?.currency)}
            </p>
          )}
          {showAddToCart && (
            <button className="mt-4 w-[183px] text-base border border-indigo-500 hover:border-indigo-400 text-indigo-500 hover:text-indigo-400 py-1 rounded-[100px] transition duration-100">
              Add to cart
            </button>
          )}
          <div className="mt-2 justify-center items-center flex">
            <Rating />
          </div>
        </a>
      </Link>
    </li>
  );
}
