const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require('../helpers');

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...query } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, ...query }, '-createdAt -updatedAt', {skip, limit}).populate('owner', 'email');
  return res.status(200).json(result);
}

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: req.params.id, owner });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return res.status(200).json(result);
}

const add =  async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
   return res.status(201).json(result);
}

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.id, owner }, req.body, { new: true });
    if (!result) {
      throw HttpError(404, 'Not found');
  }
    if (!Object.keys(req.body).length) {
    throw HttpError(400, "Missing fields");
  }
    return res.json(result);
}

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id: req.params.id, owner }, req.body, { new: true });
    if (!result) {
      throw HttpError(404, 'Not found');
  }
    if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing field favorite");
  }
    return res.json(result);
}

const deleteByID = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: req.params.id, owner });
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    return res.status(200).json({message: 'Contact deleted'});
}

module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteByID: ctrlWrapper(deleteByID),
}

