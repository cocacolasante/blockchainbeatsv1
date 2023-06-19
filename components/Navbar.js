"use client";
import { useState, useEffect, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import {AiOutlineMenu} from "react-icons/ai"
import Link from "next/link";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {checkIfWalletIsConnected, connectToWallet, currentAccount} = useContext(SmartContractContext);


  const menuList = ["Home", "Artists", "Marketplace", "About Us", "Donate", "Profile"];
  
  const handleDropdownClick = (e) =>{
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="flex bg-zinc-600">
      

          <div className="pt-6 pl-6">
            <ul>
            <p className="text-black" onClick={handleDropdownClick}><AiOutlineMenu /></p>
            {!isMenuOpen ? <li onClick={null} className="text-2xl"></li> : menuList.map((item, i)=>{
                if(i === 0){
                  return (
                    <div key={i}>
                    <Link href={`/`} >{item}</Link>
                  </div>
                  )
                }
                return(
                  <div key={i}>
                    <Link href={`/${item.toLowerCase().replace(/\s/g, '')}`} >{item}</Link>
                  </div>
                )
              })} 
              

            </ul>
          </div>
          <div className="ml-auto">
            <h1 >Blockchain Beats</h1>
          </div>
        
          <div className="pt-6 pb-0 pr-6 mb-0 ml-auto">
          {currentAccount ? <p>{currentAccount.slice(0,4)}...{currentAccount.slice(-6)}</p> : <button onClick={connectToWallet}>Connect Wallet</button>}
          </div>

      
 
      
    </nav>
  )
}

export default Navbar