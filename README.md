# Dark Forest pause
Minimal example of using ethers.js to query a blockchain

*You will need the ABI and contract address of the smart contract you want to query*

# To use:

1. `git clone https://github.com/cha0sg0d/simple-contract-interaction`
2. `npm install`
3. `node ping.js`

# Switch out the contracts

1. Copy the ABI of the smart contract you wish to interact with into a `.js` file.

```js
// yourContractAbi.js
export default [
    ABI...
]
```

2. Import the ABI: `import ABI from './yourContractAbi.js'`

# Read data on a smart contract
`await contract.READ_METHOD_NAME(args...)`


# Make change data on a smart contract
`const tx = await contract.WRITE_METHOD_NAME(args...)`
`const receipt = await tx.wait()`

# Change the private key for a write call
Make a file called `.env` that is a copy of `.env.example` and place the private key in `PRIVATE_KEY=0xyourPrivateKey`