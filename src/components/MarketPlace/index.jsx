import React, { useEffect, useState } from "react";
import products from "../../data/marketplace_data.json";
// YED import CreateNft from "../Home/CreateNft";
import Layout from "../Partials/Layout";
import MainSection from "./MainSection";

import useEth from "../../contexts/EthContext/useEth";

export default function MarketPlace() {
 
  const [marketProduct, setMarketProduct] = useState([]);

  const {
    state: { contract, web3 },
  } = useEth();

  useEffect(() => {
    if (marketProduct.length === 0) {
      const fetchData = async () => {
        console.log(contract);
        console.log(" before eventNewDSponsor");
        const eventNewDSponsor = await contract.getPastEvents("NewDSponsor", {
          fromBlock: 29310000,
          toBlock: "latest",
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

        console.log(nftContractId[1]);

        // appel dSponsorNFT Contract

        // ../../artifacts/contracts/DSponsor_Main.sol/DSponsorMain.json
        const dSponsorNFTContract = require("../../artifacts/contracts/DSponsorNFT.sol/DSponsorNFT.json"); // YED (Chemin exact du .json)

        console.log("print dSponsorNFTContract");
        console.log(dSponsorNFTContract);

        const addressDsponsorNft = nftContractId[1];

        console.log(addressDsponsorNft);

        // appel dSponsorNFT Contract pour nftContractId
        const contractNft = new web3.eth.Contract(
          dSponsorNFTContract.abi,
          addressDsponsorNft
        );

        console.log("après contractNft");
        console.log(contractNft);

        console.log(" before eventMint");
        const eventMint = await contractNft.getPastEvents("Mint", {
          fromBlock: 29310000,
          toBlock: "latest",
        });
        console.log(" after eventMint");
        console.log(eventMint);

        // appel du price pour dSponsorNFT Contract

        console.log("avant price contractNft");
        console.log(contractNft);

        console.log(" before Price");
        const price = await contractNft.methods
          .getMintPriceForCurrency("0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1")
          .call();
        products.data[0].eth_price = price;
        console.log(price);
        console.log(eventMint);

        // appel du controller pour dSponsorNFT Contract

        console.log(" before Controller");
        const controller = await contractNft.methods.getController().call();
        products.data[0].creator = controller;
        console.log(controller);
        console.log(" after Controller");

        setMarketProduct(products.data);
      };
      fetchData();
    }
    console.log("end if");
  });

  return (
    <>
      <Layout>
        <MainSection marketPlaceProduct={marketProduct} className="mb-10" />
      </Layout>
    </>
  );
}
