import { BASE_URL } from "@store/config"
import axios from "axios"

export const getProductByCategory = async(id : string)=> {
try {
    const res = await axios.get(`${BASE_URL}/product/${id}`)
    return res.data.products
} catch (error) {
    return []
    
}
}