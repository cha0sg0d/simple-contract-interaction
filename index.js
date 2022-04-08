import {ethers} from 'ethers';
// import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import ABI from './DarkForestAbi.js'

import 'dotenv/config';

const CONTRACT_ADDRESS = '0x44d68cfe2491a97b4a4d5f41394f458764c7b6d1';
const XDAI = 'https://rpc.xdaichain.com/';
const GNOSIS = 'https://optimism.gnosischain.com';

const provider = new ethers.providers.JsonRpcProvider(XDAI);

async function waitWithMetrics(tx, name = undefined) {
    try {
      var startTime = performance.now()
      const receipt = await tx.wait();
      var endTime = performance.now()
      console.log(`${name} confirmed ${endTime - startTime} milliseconds`)
      console.log(`confirmed with ${receipt.confirmations} blocks, ${receipt.gasUsed} gas used and ${tx.gasPrice} price (wei)`);  
    } catch (error) {
      // console.log(`error`, error);
      logRevertReason(tx.hash);
    }
  }

async function logRevertReason(txHash) {
    const errTx = await provider.getTransaction(txHash);
    try {
      await provider.call(errTx)
    } catch (err) {
      // console.log(`ERRR`, err);
      console.log(err.error.message)
    }
}


const main = async () => {
    var contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    // Only connect to wallet with 
    if(process.env.PRIVATE_KEY) {
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      contract = contract.connect(wallet);
    }
    try {
        /* READ OR WRITE FROM CONTRACT */
        const paused = await contract.paused();
        console.log(`is game paused?`, paused);
        let pauseTx;
        // Write call
        paused ? pauseTx = await contract.unpause({gasLimit: 1000000}) : pauseTx = await contract.pause({gasLimit: 1000000});
        
        /* IF WRITE, WAIT FOR CONFIRMATION */
        await waitWithMetrics(pauseTx, 'pause/unpause');
    } catch (error) {
        console.log("error sending tx", error);
    }

}

main().catch(console.log);



