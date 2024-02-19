const CustomerTireStorage = require("../models/CustomerTireStorage");

exports.getAll = async (req, res) => {
  try {
    const storages = await CustomerTireStorage.find();
    res.json(storages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const storage = new CustomerTireStorage({
    customerName: req.body.customerName,
    tireBrand: req.body.tireBrand,
    tireSize: req.body.tireSize,
    tireSet: req.body.tireSet,
    locationNote: req.body.locationNote,
  });

  try {
    const newStorage = await storage.save();
    res.status(201).json(newStorage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const storage = await CustomerTireStorage.findById(req.params.id);
    if (storage) {
      res.json(storage);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const storage = await CustomerTireStorage.findById(req.params.id);
    if (!storage) {
      return res.status(404).json({ message: "Not found" });
    }

    // Updating the fields
    storage.customerName = req.body.customerName || storage.customerName;
    storage.tireBrand = req.body.tireBrand || storage.tireBrand;
    storage.tireSize = req.body.tireSize || storage.tireSize;
    storage.tireSet = req.body.tireSet || storage.tireSet;
    storage.locationNote = req.body.locationNote || storage.locationNote;

    const updatedStorage = await storage.save();
    res.json(updatedStorage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await CustomerTireStorage.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: "Deleted successfully" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  const query = req.query.q; // Assuming you're sending the search query as a query parameter named 'q'

  try {
    const results = await CustomerTireStorage.find({
      $or: [
        { customerName: new RegExp(query, "i") }, // Case-insensitive search for customerName
        { tireSize: new RegExp(query, "i") }, // Case-insensitive search for tireSize
      ],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
