import ProviderSchema from "../models/providerSchema.js";

export const addProvider = async (req, res) => {
  try {
    const doc = new ProviderSchema({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    });

    const provider = await doc.save();

    res.json(provider);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные поставщика",
    });
  }
};

export const getAllProviders = async (req, res) => {
  try {
    const providers = await ProviderSchema.find();

    res.json(providers);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о поставщиках",
    });
  }
};

export const getOneProvider = async (req, res) => {
  try {
    const providerName = await ProviderSchema.findOne({ name: req.params.name });

    if (!providerName) {
      return res.status(404).json({
        message: "Поставщик не найден",
      });
    }

    res.json(providerName);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о поставщиках",
    });
  }
};

export const removeProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    ProviderSchema.findOneAndDelete(
      {
        _id: providerId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о поставщике",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Поставщик не найден",
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
      message: "Не удалось получить данные о поставщиках",
    });
  }
};

export const updateProvider = async (req, res) => {
  try {
    const providerId = req.params.id;

    await ProviderSchema.updateOne(
      {
        _id: providerId,
      },
      {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить данные поставщика",
    });
  }
};
