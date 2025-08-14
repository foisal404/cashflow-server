import mongoose, { Document, Schema } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  date: Date;
  user: mongoose.Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    title: { type: String, required: true, minlength: 3 },
    amount: { type: Number, required: true, min: 0.01 },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);
