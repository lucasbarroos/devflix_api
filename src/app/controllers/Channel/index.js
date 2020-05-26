const ChannelModel = require('../../models/Channel/index');

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
    console.log(err);
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
    const channels = await ChannelModel.find();
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
    console.log(err);
    return res.sendStatus(400).send({ message: 'Error to delete the channel!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
};
