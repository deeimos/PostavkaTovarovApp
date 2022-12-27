import ClientSchema from "../models/clientSchema.js";

export const addClient = async (req, res) => {
  try {
    const doc = new ClientSchema({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      //user: req.userId,
    });

    const client = await doc.save();

    res.json(client);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось внести данные клиента",
    });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await ClientSchema.find();

    res.json(clients);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о клиентах",
    });
  }
};

export const getOneClient = async (req, res) => {
  try {
    const clientName = await ClientSchema.findOne({ name: req.params.name });

    if (!clientName) {
      return res.status(404).json({
        message: "Клиент не найден",
      });
    }

    res.json(clientName);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить данные о клиентах",
    });
  }
};

export const removeClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    ClientSchema.findOneAndDelete(
      {
        _id: clientId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не удалось удалить данные о клиенте",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Клиент не найден",
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
      message: "Не удалось получить данные о клиентах",
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    await ClientSchema.updateOne(
      {
        _id: clientId,
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
      message: "Не удалось обновить данные клиента",
    });
  }
};
