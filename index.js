// index.js - Main server file
import express from 'express';
import cors from 'cors'; 
import { initiatePayment } from './chapaConfig.js'; // Import the initiatePayment function

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the Payment API');
});

// Payment Route
app.post('/pay', async (req, res) => {
  console.log('Received payment request:', req.body); // Log the request body
  const { first_name, last_name, email, phone_number, amount, tx_ref } = req.body;

  try { 
    const response = await initiatePayment(first_name, last_name, email, phone_number, amount, tx_ref);
    
    // Send the response back to the client, including transaction ID
    res.status(200).json({
      message: 'Payment initialized successfully',
      transaction_id: response.tx_ref, // Assuming tx_ref is the transaction ID
      payment_url: response.payment_url // Assuming response contains payment_url
    });
    console.log(response);
  } catch (error) {
    console.error('Error during payment initialization:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verification Route
app.post('/verify', async (req, res) => {
  const { tx_ref } = req.body;

  try {
    const verificationResponse = await chapa.verify(tx_ref);

    if (verificationResponse && verificationResponse.status === 'success') {
      res.status(200).json(verificationResponse);
    } else {
      res.status(400).json({ error: 'Verification failed', details: verificationResponse });
    }
  } catch (error) {
    console.error('Error during verification:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
