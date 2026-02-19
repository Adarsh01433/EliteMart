import Razorpay from "razorpay";

import crypto from "crypto"
import Order from "../models/order.js"
import Transaction from "../models/transaction.js"



const createTransaction = async(req,res)=> {
     const {amount, userId} = req.body;

     const razorPay = new Razorpay({
          key_id: process.env.RAZOR_PAY_KEY_ID,
          key_secret: process.env.RAZOR_PAY_SECRET
     })
      const options = {
          amount:amount,
          currency : "INR",
          receipt : `receipt#${Date.now()}`
      }

      try {
          if(!amount || !userId){
               return res.status(400).json({
                    sucess : false,
                    message : "Amount and user id required"
               })
          }

          const razorpayOrder = await razorPay.orders.create(options)
          res.status(201).json({
               sucess : true,
               message : "Order created Sucessfully",
               key : process.env.RAZOR_PAY_KEY_ID,
               amount : razorpayOrder.amount,
               currency : razorpayOrder.currency,
               order_id : razorpayOrder.id

          })
          
      } catch (error) {
          res.status(500).json({
               sucess : false,
               message : "Failed to create order",
               error : error.message
          });
      }
     }

     const createOrder = async(req, res)=> {

          const {
               razorpay_order_id,
               razorpay_payment_id,
               razorpay_signature,
               userId,
               cartItems,
               deliveryDate,
               address,
          } = req.body

          const key_secret = process.env.RAZOR_PAY_SECRET;

          const  generated_signature = crypto.createHash("sha256", key_secret)
          .update(razorpay_order_id+"|"+razorpay_payment_id)
          .digest("hex")

          if(generated_signature === razorpay_signature){
               try {
                    const transaction = await Transaction.create({
                         user : userId,
                         orderId : razorpay_order_id,
                         paymentId: razorpay_payment_id,
                         status : "Sucess",
                         amount : cartItems.reduce(
                              (total, item)=> total + item?.quantity * item.price,
                              0
                         ),
                    });

                    const order = await  Order.create({
                         user: userId,
                         address,
                         deliveryDate,
                         items : cartItems?.map((item)=>({
                              product:item?._id,
                              quantity : item?.quantity,
                         })),
                         status : "order Placed"
                    });

                    transaction.order = order._id;
                    await transaction.save()
                    res.json({
                         sucess : true,
                         message : "Payment Verified and order created",
                         error
                    })

               } catch (error) {
                     res.status(500).json({
               sucess : false,
               message : "Failed to create transaction or order",
               error,
          });
                    
               }
          }

     };




     const getOrderByUserId = async(req,res)=>{
          const {userId} = req.params;

          try {
               const orders = await Order.find({ user:userId})
               .populate("user", "name email")
               .populate("items.product", "name price image_uri ar_uri")
               .sort({createdAt : -1})

               if(!orders || orders.length === 0){
                    return res.status(404).json({
                         sucess : false,
                         message : "No order Found For This user"
                    })
               }
               
          } catch (error) {
               res.status(500).json({
                    success : false,
                    message : "Fai"
               })
               
          }

     }
     
export {createTransaction, createOrder, getOrderByUserId}