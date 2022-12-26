import mongoose from "mongoose";

const PriceListSchema = new mongoose.Schema(
  {
    couneter: {
      type: Number,
      required: true,
      unique: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dtBeginPrice: {
      type: Date(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PriceList", PriceListSchema);
