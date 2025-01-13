import { Chapa } from 'chapa-nodejs';

// Initialize Chapa with your secret key
const chapa = new Chapa({
  secretKey: 'CHASECK_TEST-0zD8Cma3TVM8EOa0Vt8QDOpgnoKe579O', // Replace with your actual secret key
});

// Function to generate a custom transaction reference
function generateCustomTxRef() {
  const timestamp = Date.now(); // Current timestamp
  const randomNum = Math.floor(Math.random() * 10000); // Random number
  return `tx_${timestamp}_${randomNum}`; // Custom format for tx_ref
}

// Function to initiate payment
async function initiatePayment(first_name, last_name, email, phone_number, amount) {
  try {
    // Generate custom transaction reference
    const tx_ref = generateCustomTxRef();

    // Initialize the payment
    const response = await chapa.initialize({
      first_name,
      last_name,
      email,
      phone_number,
      currency: 'ETB',
      amount,
      tx_ref, // Use the custom transaction reference
      callback_url: 'https://example.com/callback', // Replace with your actual callback URL
      return_url: 'https://example.com/return', // Replace with your actual return URL
      customization: {
        title: 'Test Title',
        description: 'Test Description',
      },
    });

    // Handle the response
    if (response && response.status === 'success') {
      console.log('Payment initialized successfully:', response);
      return response; // Return the successful response
    } else {
      console.error('Failed to initialize payment:', response);
      throw new Error('Payment initialization failed');
    }
  } catch (error) {
    console.error('Error during payment initialization:', error.message);
    // Log the full error object for more details
    console.error('Full error details:', error);
    throw error; // Rethrow the error for further handling
  }
}

// Export the initiatePayment function
export { initiatePayment };
