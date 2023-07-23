// Function to initialize Web3.js with the MetaMask provider
async function initWeb3() {
  // Check if MetaMask is installed and available
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request user permission to access their Ethereum accounts
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Initialize Web3.js with the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Now you can use the 'web3' object to interact with the Ethereum blockchain
      // For example, you can get the selected Ethereum network and the user's accounts
      const networkId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      console.log('Web3 initialized with MetaMask provider.');
      console.log('Selected network ID:', networkId);
      console.log('User accounts:', accounts);

      return web3; // Return the 'web3' object for further use
    } catch (error) {
      console.error('Error initializing Web3 with MetaMask:', error.message);
    }
  } else {
    console.error('MetaMask is not installed or not available.');
  }
}

// Function to connect to MetaMask
async function connectToMetaMask() {
  // Call the 'initWeb3()' function to initialize Web3.js with MetaMask
  const web3 = await initWeb3();
  if (web3) {
    console.log('Connected to MetaMask!');
    const ethAddress = document.getElementById('ethAddress');
    const btcAddress = document.getElementById('btcAddress');

    // Example addresses for demonstration purposes
    ethAddress.innerText = '0xAbCdEfGhIjKlMnOpQrStUvWxYz';
    btcAddress.innerText = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  } else {
    console.error('Error connecting to MetaMask.');
  }
}
