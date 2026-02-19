import mongoose, { Schema } from "mongoose";

const TransactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    status: {
        type: String,
        enum: ["Success", "Failed", "pending"],
        required: true,
    },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// ✅ Yeh correct line hai:
const Transaction = mongoose.model("Transaction", TransactionSchema);

// ✅ Ab tum default export kar rahe ho:
export default Transaction;
