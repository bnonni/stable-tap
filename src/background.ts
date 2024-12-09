// src/background.ts

console.log("Background script running");

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getBalance") {
        // Fetch the balance from the blockchain or storage
        getBalanceFromBlockchain()
            .then((balance) => {
                sendResponse({ balance });
            })
            .catch((error) => {
                sendResponse({ error: error.message });
            });
        // Keep the message channel open for asynchronous response
        return true;
    } else if (request.action === "sendTransaction") {
        // Get transaction details from the request
        const { amount, address } = request;

        // Construct, sign, and broadcast the transaction
        sendTransaction(amount, address)
            .then((txId) => {
                sendResponse({ txId });
            })
            .catch((error) => {
                sendResponse({ error: error.message });
            });
        return true;
    }
});