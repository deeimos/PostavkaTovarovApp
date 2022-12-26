import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema(
  {
    counter: {
      type: Number,
      required: true,
      unique: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    dtContract: {
      type: Date(),
      required: true,
    },
    dtSending: {
        type: Date(),
      //   required: true,
      },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contract", OrderSchema);
