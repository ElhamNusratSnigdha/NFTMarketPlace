"use client"
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { ethers } from "ethers";
import contractabi from "./abi/abi.json";

export default function Home() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  useEffect(()=>{
    async function initialize(){
      if(typeof window.ethereum!=="undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance();
        setAddress(address);
        setBalance(ethers.utils.parseEther(balance));
        mycontractaddress= "0x6690Fc1567B7453237419fB2639233E1bAc45476";
        const contract = new ethers.Contract(mycontractaddress,contractabi,signer);
        setContract(contract);
      }
    }
    initialize();
  },[])
  return (
    <>
    <div>
      <Header/>
      <div className="text-center">
        <p className="text-md text-blue-400 lg:text-3xl">Hi, {address?.slice(0,10)}...{address?.slice(-10)}</p>
      </div>
    </div>
    </>
  )
}
