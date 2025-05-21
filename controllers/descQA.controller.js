const DescQA = require("../schemas/DescQA");
const { descQAValidation } = require("../validation/descQA.validation");

exports.createDescQA = async (req, res) => {
  const { error } = descQAValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const data = new DescQA(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDescQAs = async (req, res) => {
  try {
    const list = await DescQA.find().populate("qa_id").populate("desc_id");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDescQAById = async (req, res) => {
  try {
    const item = await DescQA.findById(req.params.id)
      .populate("qa_id")
      .populate("desc_id");
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDescQA = async (req, res) => {
  const { error } = descQAValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updated = await DescQA.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDescQA = async (req, res) => {
  try {
    const deleted = await DescQA.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
