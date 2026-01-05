const express = require("express");
const paymentRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constant");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth , async (req, res) => {
  try {
    const {membershipType} = req.body;
    const {firstName, lastName, emailId} = req.user;

   const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        membershipType: membershipType,
      },
    });

    // Save it in my database
    console.log(order);

    const payment = new Payment({
        userId: req.user._id,
        orderId: order.id,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        notes: order.notes,
    });

    const savedPayment = await payment.save();


    // Return back my order details to frontend
    res.json({...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID});
  } catch(err) {
    console.log(err);
  }
});

paymentRouter.post("payment/webhook", async (req, res) => {
  try{
    const webhookSignature = req.get["X-Razorpay-Signature"];

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if(!isWebhookValid) {
      return res.status(400).json({msg: "Webhook signature is invalid" });
    }

    // Update my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({orderId: paymentDetails.orderId});
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({_id: payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();
    // Update the user as premium

    if(req.body.event == "payment.captured"){

    }
    if(req.body.event == "payment.failed"){

    }
  }catch (err){
    return res.status(500).json({ msg: err.message});
  }
})

module.exports = paymentRouter;
