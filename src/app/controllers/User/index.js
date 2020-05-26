const UserModel = require('../../models/User/index');

const store = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    return res.send(user);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to save the user!' });
  }
};

const update = async (req, res) => {
  try {
    const user = await UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400).send({ message: 'Error to update the user!' });
  }
};

const show = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.sendStatus(404).send({ message: 'User not found!' });
    }
    return res.send(user);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the user!' });
  }
};

const index = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.send(users);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to show the users!' });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400).send({ message: 'Error to delete the user!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
};
