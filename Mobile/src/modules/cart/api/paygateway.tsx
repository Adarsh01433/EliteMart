import { navigate } from "@navigation/NavigationUtil"
import { BASE_URL } from "@store/config"
import axios from "axios"
import RazorpayCheckout from "react-native-razorpay"



export const createTransaction = async(amount : number , userId : string)=> {
try {
    const res = await axios.post(`${BASE_URL}/order/transaction`, {
        userId,
        amount : amount * 100
    })
    return res.data
} catch (error) {
    return null
}
}

export const createOrder = async(
    key : string,
    amount : number,
    order_id : string,
    cart: any,
    userId : string,
    address : string
)=> {
  try {
    let options = {
        description: "Ecommerce Shopping",
        image : "https://static.vecteezy.com/system/resources/thumbnails/050/078/936/small/mysterious-anime-character-hooded-figure-with-partially-obscured-face-intense-gaze-visible-dark-atmospheric-background-with-hints-of-neon-accents-photo.jpg",
        currency : "INR",
        key : key,
        amount : amount,
        name : "EliteMart",
        order_id : order_id,
        theme : {
            color: "#53a20e" 
        }
    }

    RazorpayCheckout.open(options).then(async(data:any)=> {
        const today = new Date();
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(today.getDate() + 7);

        const res = await axios.post(`${BASE_URL}/order`, {
            razorpay_order_id: order_id,
            razorpay_payment_id: data?.razorpay_payment_id,
            razopay_signature: data?.razorpay_signature,
            userId : userId,
            cartItems : cart,
            deliveryDate : sevenDaysFromNow,
            address : address
        })
        navigate("PaymentSucess",{
            price : amount/100,
            address : address
        })
    }).catch((error:any)=> {
        console.log(error)
        return {type : 'error', message : error?.description}
        
    });
    
    
  } catch (error) {
    console.log("Erroe creating order:", error);
    return {type : 'error', message : "Error"}
    
  }
}


