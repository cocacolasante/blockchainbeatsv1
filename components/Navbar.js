"use client";
import { useState, useEffect, useContext } from "react";
import { SmartContractContext } from "../context/SmartContractContext";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {checkIfWalletIsConnected, connectToWallet, currentAccount} = useContext(SmartContractContext);


  const menuList = ["Artists", "Albums", "Marketplace", "Most Popular", "About Us", "Donate"];
  const handleDropdownClick = (e) =>{
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="">
      <div className="flex justify-end">
        <div className="pt-6 pb-0 pr-6 mb-0">
        {currentAccount ? <p>{currentAccount.slice(0,4)}...{currentAccount.slice(-6)}</p> : <button onClick={connectToWallet}>Connect Wallet</button>}
        </div>

      </div>
        <div className="flex justify-start pl-6 mt-0">
          <ul>
          <p onClick={handleDropdownClick}>Dropdown</p>
          {!isMenuOpen ? <li onClick={null} className="text-2xl">Home</li> : menuList.map((item, i)=>{
              return(
                <>
                  <li key={i}>{item}</li>
                </>
              )
            })} 
            

          </ul>
        </div>
      
    </div>
  )
}

export default Navbar