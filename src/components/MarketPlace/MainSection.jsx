import React, { useEffect, useState } from "react";
import ProductCardStyleTwo from "../Cards/ProductCardStyleTwo";
import DataIteration from "../Helpers/DataIteration";

import TrendingSection from "../Home/TrendingSection";



export default function MainSection({ className, marketPlaceProduct }) {



  const [tab] = useState("explore");
  const [products, setProducts] = useState(marketPlaceProduct);
  console.log(products);






  

  useEffect(() => {
    if (tab === "artist") {
      setProducts(marketPlaceProduct.slice(0, 3));
    } else if (tab === "market") {
      setProducts(marketPlaceProduct.slice(0, 6));
    } else if (tab === "shop") {
      setProducts(marketPlaceProduct.slice(6, 9));
    } else if (tab === "assets") {
      setProducts(marketPlaceProduct.slice(3, 6));
    } else {
      setProducts(marketPlaceProduct);
    }
  }, [tab, marketPlaceProduct]);

  return (

    <div className={`market-place-section w-full ${className || ""}`}>
          <TrendingSection></TrendingSection>
      <div className="market-place-wrapper w-full">
        <div className="filter-navigate-area lg:flex justify-between mb-8 items-center">
          <div className="tab-item lg:mb-0 mb-5">
            <div className="md:flex md:space-x-8 space-x-2">
              <p className="text-base text-thin-light-gray tracking-wide mb-7">
                Avec d>sponsor, promouvoir son activité se fait en seulement
                quelques clics. Achetez un espace de visiblilé, informez votre
                publcité et c’est terminé !
              </p>
            </div>
          </div>
        </div>
        <div className="filter-navigate-content w-full min-h-screen">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-[30px]">
            <DataIteration
              datas={products}
              startLength="0"
              endLength={products.length}
            >
              {({ datas }) => (
                <ProductCardStyleTwo key={datas.id} datas={datas} />
              )}
            </DataIteration>
          </div>
        </div>
      </div>
    </div>
  );
}
