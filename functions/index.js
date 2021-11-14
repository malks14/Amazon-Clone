// const functions = require("firebase-functions");
// const express = require('express');
// const cors = require('cors')
// const stripe = require('stripe')('sk_test_51Jv9msJmz5Kc2orR52zJXFWKfzdfMPlMEJvyBqcLRnCIfRriozVzgBi9sONhMIulWslQ1XOOW95Mhc93c24wFn9R000cK21ezz');

// //API

// //App config
// const app = express();
// //Midddlewares
// app.use(cors({origin: true}));
// app.use(express.json());

// //API routes
// app.get('/', (request, response) => response.status(200).send('hello world'));
// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;
    
//     console.log('Payment request received boom!', total)

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: 'usd',
//     });
//     //201 significa que esta ok y creo algo
//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//     })
// })

// //Listen command
// exports.api = functions/functions.https.onRequest(app);