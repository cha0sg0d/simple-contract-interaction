import {ethers} from 'ethers';
import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import ABI from './DarkForestAbi.js'

const PLAYER_ADDRESS = '0x26e695d87d68a738736059201d362501abbc4e1d';
const XDAI = 'https://rpc.xdaichain.com/'

const provider = new ethers.providers.JsonRpcProvider(XDAI);



const main = async () => {
    const core = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    try {
        const constants = await core.getGameConstants();
        console.log('constants', JSON.stringify(constants));
        
    } catch (error) {
        console.log("error getting bulk", error);
    }

}

main().catch(console.log);



