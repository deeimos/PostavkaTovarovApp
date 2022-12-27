import OrderSchema from "../models/orderSchema.js";
import ProductSchema from "../models/productSchema.js";
import CompositionOrderSchema from "../models/compositionOrderSchema.js";

export const addCompositionOrder = async (req, res) => {
  try {
    const orderId = await OrderSchema.findOne({
      counter: req.body.order,
    });
    const productId = await ProductSchema.findOne({
      name: req.body.product,
    });
    if (!orderId || !productId)
      return res.status(500).json({
        message: "Не удалось внести данные о составе заказа",
      });

    const doc = new CompositionOrderSchema({
      order: orderId,
      product: productId,
      count: req.body.count,
    });

    const compositionOrder = await doc.save();

    res.json(compositionOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные о составе заказа",
    });
  }
};

export const getAllCompositionOrders = async (req, res) => {
  try {
    const compositionOrders = await CompositionOrderSchema.find()
      .populate("order product")
      .exec();

    res.json(compositionOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о составе заказов",
    });
  }
};

export const getOneCompositionOrder = async (req, res) => {
  try {
    const orderComposition = await CompositionOrderSchema.find({
      order: req.params.orderId,
    })
      .populate("order product")
      .exec();

    if (!orderComposition) {
      return res.status(404).json({
        message: "Заказ не найден",
      });
    }

    res.json(orderComposition);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о составе заказах",
    });
  }
};

export const removeCompositionOrder = async (req, res) => {
  try {
    const compositionOrderId = req.params.id;

    CompositionOrderSchema.findOneAndDelete(
      {
        _id: compositionOrderId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о составе заказа",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Состав заказа не найден",
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
      message: "Не удалось получить данные о составе заказов",
    });
  }
};

export const updateCompositionOrder = async (req, res) => {
  try {
    const compositionOrderId = req.params.id;

    const orderId = await OrderSchema.findOne({
      counter: req.body.order,
    });
    const productId = await ProductSchema.findOne({
      name: req.body.product,
    });
    if (!orderId || !productId)
      return res.status(500).json({
        message: "Не удалось внести данные о составе заказа",
      });

    await CompositionOrderSchema.updateOne(
      {
        _id: compositionOrderId,
      },
      {
        order: orderId,
        product: productId,
        count: req.body.count,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные о составе заказа",
    });
  }
};
