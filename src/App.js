import './App.css';
import mintExampleAbi from "./mintExamplAbi.json"
import {ethers, BigNumber} from "ethers"
import {useEffect, useState} from 'react'

const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {
  //connecting to smart contract

  const [accounts, setAccounts] = useState([]);
  const [mintAmount, setMintAmount] = useState(1)

  async function connectAccounts(){
    if (window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      setAccounts(accounts);
    }
   }  

  useEffect(() => {
    connectAccounts();
  },[])

  //minting 

  async function handleMint() {
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      //providers are a way to connect to the blockchain
      //for metamask you would use web3 provider and pas in window.ethereum

      const signer = provider.getSigner();
      // anytime a call requires money, or a transaction 
      //requires an exchange of a token, youre going to have to sign the call
      //will allow us confirmation from the user in metamask so that they approve that transaction

      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      )
      try {
        const response = await contract.mint(BigNumber.from(mintAmount))
        console.log("response", response)
      }catch(err){
        console.log("error", err)
      }
    }
  }
  return (
    <div className="App">
      Create 
      {accounts.length && (
        <div>
          <button 
          onClick={()=> setMintAmount(mintAmount-1)}
          >-</button>
          {mintAmount}
          <button 
          onClick={()=> setMintAmount(mintAmount+1)}
          >+</button>
          <button
          onClick={handleMint}
          >Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
