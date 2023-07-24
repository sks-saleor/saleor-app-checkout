import { PhotographIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import { usePaths } from "@/lib/paths";
import { translate } from "@/lib/translations";
import { ProductCardFragment } from "@/saleor/api";
import { formatAsMoney } from "@/lib/util";
import styles from "./ProductCard.module.css";
import { Rating } from "../Rating";
import Image from "next/legacy/image";

export interface ProductCardProps {
  product: ProductCardFragment;
  showRating?: boolean;
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

export function ProductCard({ product, showRating = false }: ProductCardProps) {
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
            <div className="bg-white aspect-w-1 aspect-h-1 relative">
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  className="w-full"
                  width={176}
                  height={176}
                  layout="fill"
                  alt={product.name}
                  objectFit="contain"
                  role="button"
                  tabIndex={-2}
                  priority
                />
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
          {showRating && (
            <div className="mt-2 justify-center items-center flex">
              <Rating totalStars={product?.rating ?? 0} />
            </div>
          )}
        </a>
      </Link>
    </li>
  );
}
