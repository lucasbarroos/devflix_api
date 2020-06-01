const ChannelModel = require('../../models/Channel/index');
const UserModel = require('../../models/User/index');

const store = async (req, res) => {
  try {
    const channel = await ChannelModel.create(req.body);
    return res.send(channel);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to save the channel!' });
  }
};

const update = async (req, res) => {
  try {
    const channel = await ChannelModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(channel);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to update the channel!' });
  }
};

const show = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);
    if (!channel) {
      return res.sendStatus(404).send({ message: 'Channel not found!' });
    }
    return res.send(channel);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the channel!' });
  }
};

const index = async (req, res) => {
  try {
    const channels = await ChannelModel.find().populate('channel');
    return res.send(channels);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to show the channels!' });
  }
};

const destroy = async (req, res) => {
  try {
    const channel = await ChannelModel.findByIdAndDelete(req.params.id);
    return res.send(channel);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to delete the channel!' });
  }
};

const subscribe = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);
    const user = await UserModel.findById(req.params.userId);

    if (!channel) return res.sendStatus(400).send({ message: 'Channel not found!' });

    if (!user) return res.sendStatus(400).send({ message: 'User not found!' });

    await UserModel
      .findOneAndUpdate({ _id: req.params.userId }, { channels: { $push: channel } });

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to subscribe in the channel!' });
  }
};

const isSubscribedUser = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);

    if (!channel) return res.sendStatus(400).send({ message: 'Channel not found!' });

    const user = await UserModel
      .findOne({ _id: req.params.userId, channels: { $in: req.params.id } });

    if (!user) {
      return res.sendStatus(400).send({ subscribed: false });
    }

    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to subscribe in the channel!' });
  }
};

const getSubscribedTotal = async (req, res) => {
  try {
    const channel = await ChannelModel.findById(req.params.id);

    if (!channel) return res.sendStatus(400).send({ message: 'Channel not found!' });

    const quant = await UserModel
      .countDocuments({ channels: { $in: req.params.id } });

    return res.send({ quant });
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the information about the channel!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
  subscribe,
  isSubscribedUser,
  getSubscribedTotal,
};
