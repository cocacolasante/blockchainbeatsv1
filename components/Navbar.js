"use client";
import { useState, useEffect, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";
import {AiOutlineMenu} from "react-icons/ai"
import Link from "next/link";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {checkIfWalletIsConnected, connectToWallet, currentAccount} = useContext(SmartContractContext);


  const menuList = ["Artists", "Albums", "Marketplace", "Most Popular", "About Us", "Donate"];
  
  const handleDropdownClick = (e) =>{
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="flex">
      

          <div className="pt-6 pl-6">
            <ul>
            <p className="text-black" onClick={handleDropdownClick}><AiOutlineMenu /></p>
            {!isMenuOpen ? <li onClick={null} className="text-2xl"></li> : menuList.map((item, i)=>{
                return(
                  <>
                    <Link href={`/${item.toLowerCase().replace(/\s/g, '')}`} key={i}>{item}</Link>
                  </>
                )
              })} 
              

            </ul>
          </div>
          <div className="m-auto">
            <h1 >Blockchain Beats</h1>
          </div>
        
          <div className="pt-6 pb-0 pr-6 mb-0 ml-auto">
          {currentAccount ? <p>{currentAccount.slice(0,4)}...{currentAccount.slice(-6)}</p> : <button onClick={connectToWallet}>Connect Wallet</button>}
          </div>

      
 
      
    </nav>
  )
}

export default Navbar