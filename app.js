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
    res.send('Hello ');
    console.log("Hello world");
});
// Callback endpoint for successful payments
app.post('/razorpay/callback/', (req, res) => {
    const body = req.body;

    // Log the request body
    console.log('Razorpay Callback:', body);

    // Process the payment confirmation as needed

    res.json({ status: 'success' }); // Respond to Razorpay to acknowledge receipt
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
