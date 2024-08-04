import StellarSdk from 'stellar-sdk';
import { Server } from 'stellar-sdk/lib/horizon/server.js';
const server = new Server("https://horizon-testnet.stellar.org/");
async function StellarTransaction(account, xlm, userKeyPair, destinationAcc) {
    try {


        // Build the transaction
        const transaction = new StellarSdk.TransactionBuilder(account, {
            fee: StellarSdk.BASE_FEE,
            networkPassphrase: StellarSdk.Networks.TESTNET,
        })
            .addOperation(StellarSdk.Operation.payment({
                destination: destinationAcc,
                amount: xlm,
                asset: StellarSdk.Asset.native(),
            }))
            .setTimeout(180)
            .build();

        // Sign the transaction
        transaction.sign(userKeyPair);

        // Submit the transaction to the Stellar network
        const response = await server.submitTransaction(transaction);
        return response;
    } catch (error) {
        console.error('Error in StellarTransaction:', error.response ? error.response.data : error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
            const resultCodes = error.response.data.extras.result_codes;
            console.error('Result codes:', resultCodes);
        }
        throw error;
    }
}

export default StellarTransaction;