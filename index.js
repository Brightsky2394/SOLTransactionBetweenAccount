// import solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
} = require("@solana/web3.js");

// Get a keypair and it's secretKey
const newPair = Keypair.generate();
console.log("Below will be pasted into our code: \n");
console.log(newPair.secretKey);

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

async function transferSol() {
    const connection = new Connection(clusterApiUrl('devnet'), "confirmed");
    // Make keypair from secretkey
    let from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
    // Generate another key pair
    const to =  Keypair.generate();

    // Airdrop 3 SOL to sender wallet
    console.log(`Airdropping some SOL to sender wallet`);

    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(from.publicKey), 3 * LAMPORTS_PER_SOL
    )

    // Blockhash (unique identifier of the block) of the cluster
    const latestBlockHash = await connection.getLatestBlockhash();

    // Confirm transaction using last valid block height
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: fromAirDropSignature
    })

    // Transfer SOL from "from wallet" to "to wallet"
    let transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: LAMPORTS_PER_SOL / 100
        })
    )
    
    let signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    )

    console.log(`Signature is `, signature);
}


transferSol();