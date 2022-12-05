import React, { useEffect, useState } from "react";
import ProductCardStyleTwo from "../Cards/ProductCardStyleTwo";
import DataIteration from "../Helpers/DataIteration";
import products from "../../data/marketplace_data.json";

import TrendingSection from "../Home/TrendingSection";
import useEth from "../../contexts/EthContext/useEth";

export default function MainSection({ className }) {
  const {
    state: { contract, web3, dSponsorNFTContract},
  } = useEth();

  const [tab] = useState("explore");

  const [marketProducts, setMarketProducts] = useState([]);

  useEffect(() => {
    if (marketProducts.length === 0) {
      const fetchData = async () => {
        console.log(contract);
        console.log(" before eventNewDSponsor");
        const eventNewDSponsor = await contract.getPastEvents("NewDSponsor", {
          fromBlock: 29454517,
          toBlock: 29454517 + 1000,
        });
        console.log(" after eventNewDSponsor");
        console.log(eventNewDSponsor);

        // On fait un tableau avec les nftContrat
        console.log("construction de la table des contrats");
        const nftContractId = eventNewDSponsor.map(
          (Id) => Id.returnValues.nftContract
        );
        console.log("table des contrats : ");
        console.log(nftContractId);

        console.log(nftContractId[0]);

        console.log("print dSponsorNFTContract");

        const addressDsponsorNft = nftContractId[0];

        console.log(addressDsponsorNft);

        // appel dSponsorNFT Contract pour nftContractId
        const contractNft = new web3.eth.Contract(
          dSponsorNFTContract.abi,
          addressDsponsorNft
        );

        console.log("après contractNft");
        console.log(contractNft);

        console.log(" before eventMint");
        // console.log( await web3.eth.getBlockNumber);
        // const eventMint = await contractNft.getPastEvents("Mint", {
        //   fromBlock: web3.eth.getBlockNumber - 900,
        //   toBlock: "latest",
        // });
        // appel du price pour dSponsorNFT Contract

        console.log("avant price c ontractNft");
        console.log(contractNft);

        console.log(" before Price");
        const price = await contractNft.methods
          .getMintPriceForCurrency("0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1")
          .call();
        products.data[0].eth_price = price.amount;
        console.log(price);

        // appel du controller pour dSponsorNFT Contract

        console.log(" before Controller");
        const controller = await contractNft.methods.getController().call();
        products.data[0].creator = controller;
        console.log(controller);
        console.log(" after Controller");

        setMarketProducts(products.data);
      };
      fetchData();
    }
    console.log("end if");
  });

  useEffect(() => {
    if (tab === "artist") {
      setMarketProducts(marketProducts.slice(0, 3));
    } else if (tab === "market") {
      setMarketProducts(marketProducts.slice(0, 6));
    } else if (tab === "shop") {
      setMarketProducts(marketProducts.slice(6, 9));
    } else if (tab === "assets") {
      setMarketProducts(marketProducts.slice(3, 6));
    } else {
      setMarketProducts(marketProducts);
    }
  }, [tab, marketProducts]);

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
              datas={marketProducts}
              startLength="0"
              endLength={marketProducts.length}
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
