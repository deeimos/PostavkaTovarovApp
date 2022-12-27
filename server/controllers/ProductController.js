import ProductSchema from "../models/productSchema.js";

export const addProduct = async (req, res) => {
  try {
    const doc = new ProductSchema({
      name: req.body.name,
      description: req.body.description,
    });

    const product = await doc.save();

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные о товаре",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find();

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о товарах",
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const productName = await ProductSchema.findOne({
      name: req.params.name,
    });

    if (!productName) {
      return res.status(404).json({
        message: "Товар не найден",
      });
    }

    res.json(productName);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о товарах",
    });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    ProductSchema.findOneAndDelete(
      {
        _id: productId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о товаре",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Товар не найден",
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
      message: "Не удалось получить данные о товарах",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await ProductSchema.updateOne(
      {
        _id: productId,
      },
      {
        name: req.body.name,
        description: req.body.description,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные о товаре",
    });
  }
};
