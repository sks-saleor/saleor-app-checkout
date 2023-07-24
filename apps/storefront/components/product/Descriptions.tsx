import React from "react";
import styles from "./Descriptions.module.css";
import { ProductDetailsFragment } from "@/saleor/api";
import RichText from "../RichText";
import { translate } from "@/lib/translations";

interface IProps {
  product: ProductDetailsFragment;
}
export const Descriptions: React.FC<IProps> = ({ product }) => {
  const description = translate(product, "description");

  return (
    <div className="w-full pb-16">
      <h2 className="text-md font-bold text-indigo-500 mb-[15px]">Product Details</h2>
      <div className={styles["box-line"]}>
        <hr />
      </div>
      {description && (
        <div className="space-y-6">
          <RichText jsonStringData={description} />
        </div>
      )}
    </div>
  );
};
