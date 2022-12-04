import React, { useRef } from "react";
import ProductCardStyleOne from "../Cards/ProductCardStyleOne";
import Icons from "../Helpers/Icons";
import SliderCom from "../Helpers/SliderCom";


import useEth from "../../contexts/EthContext/useEth";


export default function TrendingSection({ className, trending }) {

  
const { state: { contract, web3 } } = useEth();

  const settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 619,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const trendingSlider = useRef(null);
  const prevHandler = () => {
    trendingSlider.current.slickPrev();
  };
  const nextHandler = () => {
    trendingSlider.current.slickNext();
  };

  const  callContract = async () => {
    console.log(contract);
    console.log(" before eventNewDSponsor");
    const eventNewDSponsor = await contract.getPastEvents("NewDSponsor", { fromBlock: 29310000, toBlock: "latest" });
    console.log(" after eventNewDSponsor");
    console.log(eventNewDSponsor);

      // On fait un tableau avec les nftContrat
      console.log('construction de la table des contrats');
      const nftContractId = eventNewDSponsor.map((Id) => Id.returnValues.nftContract);
      console.log('table des contrats : ');
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
      const contractNft = new web3.eth.Contract(dSponsorNFTContract.abi,addressDsponsorNft); 

      console.log("après contractNft");
      console.log(contractNft);

      console.log(" before eventMint");
      const eventMint = await contractNft.getPastEvents("Mint", { fromBlock: 29310000, toBlock: "latest" });
      console.log(" after eventMint");
      console.log(eventMint);

      
      // appel du price pour dSponsorNFT Contract 

      console.log("avant price contractNft");
      console.log(contractNft);

      console.log(" before Price");
      const price = await contractNft.methods.getMintPriceForCurrency("0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1").call();
      console.log(price);
      console.log(eventMint);

      // appel du controller pour dSponsorNFT Contract 

      console.log(" before Controller");
      const controller = await contractNft.methods.getController().call();
      console.log(controller);
      console.log(" after Controller");
      

     
     // YED {{address_dsponsor_nft} => récupéré de l’event 


  }


  return (
    <div className={`trending-section w-full px-2 sm:px-0 ${className || ""}`}>
      {/* heading */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-26 font-bold text-dark-gray">Tranding Action</h1>
        </div>
        <button onClick={callContract} type="button">Call DSPponsorNFT events</button>
        <div className="slider-btns flex space-x-4">
          <button onClick={nextHandler} type="button">
            <div className="trending-slider-left-btn relative text-white w-10 h-10 flex justify-center items-center rounded-full overflow-hidden">
              <svg
                width="11"
                height="19"
                viewBox="0 0 11 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.09766 1.1499L1.13307 9.11449L9.09766 17.0791"
                  stroke="url(#paint0_linear_220_23410)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_220_23410"
                    x1="9.09766"
                    y1="1.1499"
                    x2="-4.2474"
                    y2="7.96749"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#F539F8" />
                    <stop offset="0.416763" stopColor="#C342F9" />
                    <stop offset="1" stopColor="#5356FB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
          <button onClick={prevHandler} type="button">
            <div className="trending-slider-right-btn  primary-gradient  text-white w-10 h-10 relative flex justify-center items-center rounded-full ">
              <Icons name="arrows" />
            </div>
          </button>
        </div>
      </div>
      {/* trending products */}
      <div className="trending-products relative w-full">
        <SliderCom selector={trendingSlider} settings={settings}>
          {trending &&
            trending.length > 0 &&
            trending.map((item) => (
              <ProductCardStyleOne key={item.id} datas={item} />
            ))}
        </SliderCom>
      </div>
    </div>
  );
}
