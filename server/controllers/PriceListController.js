import PriceListSchema from "../models/priceListSchema.js";
import ProductSchema from "../models/productSchema.js";

export const addPriceList = async (req, res) => {
  try {
    const productId = await ProductSchema.findOne({
      name: req.body.product,
    });
    if (!productId)
      return res.status(500).json({
        message: "Не удалось внести данные о прейскуранте. Товар не найден",
      });

    const doc = new PriceListSchema({
      counter: req.body.counter,
      product: productId,
      price: req.body.price,
      dtBeginPrice: req.body.dtBeginPrice,
    });

    const priceList = await doc.save();

    res.json(priceList);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные о прейскуранте",
    });
  }
};

export const getAllPriceLists = async (req, res) => {
  try {
    const priceLists = await PriceListSchema.find().populate("product").exec();

    res.json(priceLists);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о прейскурантах",
    });
  }
};

export const getOnePriceList = async (req, res) => {
  try {
    const priceListCounter = await PriceListSchema.find({
      counter: req.params.counter,
    })
      .populate("product")
      .exec();

    if (!priceListCounter) {
      return res.status(404).json({
        message: "Прейскурант не найден",
      });
    }

    res.json(priceListCounter);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о прейскурантах",
    });
  }
};

export const removePriceList = async (req, res) => {
  try {
    const priceListId = req.params.id;

    PriceListSchema.findOneAndDelete(
      {
        _id: priceListId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о прейскуранте",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Прейскурант не найден",
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
      message: "Не удалось получить данные о прейскурантах",
    });
  }
};

export const updatePriceList = async (req, res) => {
  try {
    const priceListId = req.params.id;

    const productId = await PriceListSchema.findOne({
      name: req.body.product,
    });
    if (!productId)
      return res.status(500).json({
        message: "Не удалось внести данные о прейскуранте. Товар не найден",
      });

    await PriceListSchema.updateOne(
      {
        _id: priceListId,
      },
      {
        counter: req.body.counuter,
        product: productId,
        price: req.body.price,
        dtBeginPrice: req.body.dtBeginPrice,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные о прейскуранте",
    });
  }
};


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
