import OrderSchema from "../models/orderSchema.js";
import ProductSchema from "../models/productSchema.js";
import CompositionOrderSchema from "../models/compositionOrderSchema.js";
import PriceListSchema from "../models/priceListSchema.js";

// получить актуальную цену
// export const getActualDate = async (req, res) => {
//   try {
//     const data = new Date("2022-12-24")
//     const priceLists = await PriceListSchema.find().sort({ dtBeginPrice: 1 });
//     let result;
//     for (let i in priceLists){
//       if (i > 0 && priceLists[i].dtBeginPrice > data && priceLists[i].product == "63ab37f4fc54e542243f069a")
//         result = priceLists[i-1];
//     }
//     res.json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Не удалось получить данные о прейскурантах",
//     });
//   }
// };

export const addCompositionOrder = async (req, res) => {
  try {
    const orderId = await OrderSchema.findOne({
      counter: req.body.order,
    });
    const productId = await ProductSchema.findOne({
      name: req.body.product,
    });

    const priceLists = await PriceListSchema.find().sort({ dtBeginPrice: 1 });
    if (!orderId || !productId || !priceLists)
      return res.status(500).json({
        message: "Не удалось внести данные о составе заказа",
      });

    let result;
    for (let i in priceLists) {
      if (String(priceLists[i].product._id) === String(productId._id)) {
        if (Number(priceLists[i].dtBeginPrice) < Number(orderId.dtContract))
          result = Number(priceLists[i].price);
      }
    }

    const doc = new CompositionOrderSchema({
      order: orderId,
      product: productId,
      price: result,
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
