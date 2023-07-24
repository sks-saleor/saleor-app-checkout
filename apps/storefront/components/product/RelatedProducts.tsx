import React from "react";
import { ProductDetailsFragment } from "@/saleor/api";
import styles from "./RelatedProducts.module.css";
import FilteredProductList from "../productList/FilteredProductList";

interface IProps {
  product: ProductDetailsFragment;
}
export const RelatedProducts: React.FC<IProps> = React.memo(({ product }) => {
  const productType = product?.productType;

  return (
    <div className="w-full pb-16">
      <h2 className="text-md font-bold text-indigo-500 mb-[15px]">Related Products</h2>
      <div className={styles["related-line"]}>
        <hr />
      </div>
      <FilteredProductList
        attributeFiltersData={[]}
        productTypeIDs={[productType.id]}
        isRelated
        showRating
        perPage={8}
      />
    </div>
  );
});
