import OrderSchema from "../models/orderSchema.js";
import ClientSchema from "../models/clientSchema.js";
import ProviderSchema from "../models/providerSchema.js";

export const addOrder = async (req, res) => {
  try {
    const clientId = await ClientSchema.findOne({
      name: req.body.client,
    });
    const providerId = await ProviderSchema.findOne({
      name: req.body.provider,
    });
    if (!clientId || !providerId)
      return res.status(500).json({
        message: "Не удалось внести данные о заказе",
      });

    const doc = new OrderSchema({
      counter: req.body.counter,
      client: clientId,
      provider: providerId,
      dtContract: req.body.dtContract,
      dtSending: req.body.dtSending,
      sum: req.body.sum,
    });

    const order = await doc.save();

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные о заказе",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .populate("client provider")
      .exec();

    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о заказах",
    });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const orderCounter = await OrderSchema.findOne({
      counter: req.params.counter,
    })
      .populate("client provider")
      .exec();

    if (!orderCounter) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    res.json(orderCounter);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о заказах",
    });
  }
};

export const removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    OrderSchema.findOneAndDelete(
      {
        _id: orderId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о заказе",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Заказ не найден",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о заказах",
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const clientId = await ClientSchema.findOne({
      name: req.body.client,
    });
    const providerId = await ProviderSchema.findOne({
      name: req.body.provider,
    });
    if (!clientId || !providerId)
      return res.status(500).json({
        message: "Не удалось внести данные о заказе",
      });

    await OrderSchema.updateOne(
      {
        _id: orderId,
      },
      {
        counter: req.body.counter,
        client: clientId,
        provider: providerId,
        dtContract: req.body.dtContract,
        dtSending: req.body.dtSending,
        sum: req.body.sum,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные о заказе",
    });
  }
};
