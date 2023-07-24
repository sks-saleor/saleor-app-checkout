import React from "react";
import { useProductTypePathsQuery } from "@/saleor/api";
import { Spinner } from "../Spinner";
import { mapEdgesToItems } from "@/lib/maps";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProductTypes.module.css";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import Link from "next/link";
import usePaths from "@/lib/paths";

export const ProductTypes = React.memo(() => {
  const { data, loading, error } = useProductTypePathsQuery({});
  const paths = usePaths();

  if (loading) return <Spinner />;
  if (error) return <p>Error</p>;

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 2.5,
        },
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4.5,
          slidesToScroll: 4.5,
        },
      },
    ],
  };

  const productTypes = mapEdgesToItems(data?.productTypes);

  const getBackgroundImage = (metadata: any[]) => {
    const src = metadata.find((item) => item.key === "src")?.value ?? null;
    return src;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl text-center">What do you looking for?</h2>
      <p className="text-base text-center text-gray-500">
        Best brands, best prices, best quality. We have everything you need to
      </p>
      <div className="mt-4">
        <Slider {...settings}>
          {productTypes?.map((productType) => (
            <div key={productType.id}>
              <Link href={paths.productType._slug(productType.id).$url()} passHref legacyBehavior>
                <a
                  href="pass"
                  className={`${styles.card}`}
                  style={{ backgroundImage: `url(${getBackgroundImage(productType.metadata)})` }}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
});

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}
