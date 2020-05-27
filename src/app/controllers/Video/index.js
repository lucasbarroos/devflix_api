const VideoModel = require('../../models/Video/index');

const store = async (req, res) => {
  try {
    const video = await VideoModel.create(req.body);
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to save the video!' });
  }
};

const update = async (req, res) => {
  try {
    const video = await VideoModel
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to update the video!' });
  }
};

const show = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id)
      .populate('channel');
    if (!video) {
      return res.sendStatus(404).send({ message: 'Video not found!' });
    }
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the video!' });
  }
};

const index = async (req, res) => {
  try {
    const videos = await VideoModel.find().populate('channel');
    return res.send(videos);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to show the videos!' });
  }
};

const destroy = async (req, res) => {
  try {
    const video = await VideoModel.findByIdAndDelete(req.params.id);
    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to delete the video!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
};
