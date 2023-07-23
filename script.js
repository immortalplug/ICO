// Function to initialize Web3.js with the MetaMask provider
async function initWeb3() {
  // Check if MetaMask is installed and available
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request user permission to access their Ethereum accounts
      await window.ethereum.enable();

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
  } else {
    console.error('Error connecting to MetaMask.');
  }
}

// Function to get the selected cryptocurrency type (ETH or BTC)
function getSelectedCryptoType() {
  const selectedCrypto = document.querySelector('input[name="crypto"]:checked');
  return selectedCrypto ? selectedCrypto.value : null;
}

// Function to process the payment
async function processPayment() {
  const amount = document.getElementById('amount').value;
  const cryptoType = getSelectedCryptoType();

  if (amount < 30) {
    alert('Minimum investment amount is £30.');
    return;
  }

  // Check if MetaMask is installed and connected to an Ethereum network
  if (typeof window.ethereum !== 'undefined') {
    try {
      // Request user permission to access their Ethereum accounts
      await window.ethereum.enable();

      // Initialize Web3.js with the MetaMask provider if not already initialized
      const web3 = window.web3 || await initWeb3();

      // Get the selected cryptocurrency address from MetaMask
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // Perform your validation and investment logic here
      // For simplicity, we'll just log the investment details
      console.log(`Investing ${amount} ${cryptoType} from address: ${userAddress}`);
    } catch (error) {
      console.error('Error accessing MetaMask accounts:', error.message);
    }
  } else {
    // MetaMask is not installed or not connected to an Ethereum network
    console.error('Please install and connect MetaMask to proceed with the investment.');
  }
}
