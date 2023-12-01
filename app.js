const express = require('express');
const cors = require('cors');
const app = express();
const Razorpay = require('razorpay');

const port = 4000;
const key_id = 'rzp_test_y5R5mbaUvtBznA';
const key_secret = 'zYMMv9ayVrYAyns77zYRaK7a';

var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
});

app.use(express.json());
app.use(cors({ origin: '*' }));  // Allow requests from any origin

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log("Hello world");
});
// Callback endpoint for successful payments

app.post('/razorpay/callback/', (req, res) => {
    const body = req.body;

    // Log the entire request body
    console.log('Razorpay Callback:', body);

    try {
        // Extract relevant details from the request body
        const orderId = body.payload.order.entity.id;
        const paymentId = body.payload.payment.entity.id;
        const signature = body.payload.payment.entity.signature;

        // Additional details based on your requirements
        const amountPaid = body.payload.payment.entity.amount;
        const currency = body.payload.payment.entity.currency;
        const status = body.payload.payment.entity.status;

        // Process the payment confirmation as needed
        // For example, save the details to your database, update order status, etc.

        console.log('Order ID:', orderId);
        console.log('Payment ID:', paymentId);
        console.log('Signature:', signature);
        console.log('Amount Paid:', amountPaid);
        console.log('Currency:', currency);
        console.log('Payment Status:', status);

        // Respond to Razorpay to acknowledge receipt
        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error processing Razorpay callback:', error);
        res.status(500).json({ status: 'error', message: 'Error processing callback' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
