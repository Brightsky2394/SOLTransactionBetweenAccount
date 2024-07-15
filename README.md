# Title: Create keypair and send SOL between accounts

## Step by step procedure are enumerated below:

1. Import solana web3 functionalities (Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram and sendAndConfirmTransaction) by requiring "@solana/web3.js"

   ```
       const {
           Connection,
           PublicKey,
           clusterApiUrl,
           Keypair,
           LAMPORTS_PER_SOL,
           Transaction,
           SystemProgram,
           sendAndConfirmTransaction
       } = require("@solana/web3.js");

   ```

2. Get a keypair and it's secretKey

   ```
       const newPair = Keypair.generate();
       console.log("Below will be pasted into our code: \n");
       console.log(newPair.secretKey);

   ```

3. Declare a variable called "DEMO_FROM_SECRET_KEY" to hold a new Uint8Array of the console secret key in step 2

   ```
   const DEMO_FROM_SECRET_KEY = new Uint8Array(
           [
               106,  29, 102, 142, 243, 171, 186, 225, 175,  80, 209,
               42, 217, 147,  12,   7, 186, 255, 121,  67, 216, 253,
               240, 101,  18, 182,  71, 208,  90, 193,  39, 129,  92,
               211, 106, 184, 193, 128, 241, 111,  42, 144, 173, 204,
               57, 239, 158, 227, 162,   8,  33, 151, 228, 112,  34,
               228, 148, 150, 252,  52,  37, 131,  82,  71
           ]
       )

   ```

4. Declare an async function named "transferSol" which result in the following:

   - Creation of two key pair i.e "from" and "to"

     ```
         let from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
         const to =  Keypair.generate();

     ```

   - Airdrop some SOL into the sender wallet

     ```
         const fromAirDropSignature = await connection.requestAirdrop(
             new PublicKey(from.publicKey), 3 * LAMPORTS_PER_SOL
         )

     ```

   - confirm transaction using some properties of the latestBlockHash like blockhash, lastValidBlockHeight and signature

     ```
         const latestBlockHash = await connection.getLatestBlockhash();
         await connection.confirmTransaction({
             blockhash: latestBlockHash.blockhash,
             lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
             signature: fromAirDropSignature
         })
     ```

   - Transfer SOL from "from wallet" to "to wallet"

     ```
         let transaction = new Transaction().add(
             SystemProgram.transfer({
             fromPubkey: from.publicKey,
             toPubkey: to.publicKey,
             lamports: LAMPORTS_PER_SOL / 100
         })
      )

     ```

   - confirm signature
     ```
     let signature = await sendAndConfirmTransaction(
     connection,
     transaction,
     [from]
     )
     ```

   console.log(`Signature is `, signature);

   ```

   ```

## Test

Run the code in the CLI (Command Line Interface) or terminal the command:
`       node index.js
  `

## Author

Sikiru Yaya (skycode)
