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

    await VideoModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          video_analytics:
          {
            views: video.video_analytics.views + 1,
            recommended: video.video_analytics.recommended,
          },
        },
        {
          new: true,
        },
      );

    return res.send(video);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to get the video!' });
  }
};

const index = async (req, res) => {
  try {
    const filter = {};
    if (req.query.channel) filter.channel = req.query.channel;
    const videos = await VideoModel.find(filter).populate('channel');
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

const recommendVideo = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id);

    if (!video) return res.sendStatus(404).send({ message: 'Video not found!' });

    const newVideo = await VideoModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          video_analytics:
          {
            views: video.video_analytics.views,
            recommended: video.video_analytics.recommended + 1,
          },
        },
        {
          new: true,
        },
      );

    return res.send(newVideo);
  } catch (err) {
    return res.sendStatus(400).send({ message: 'Error to recommend the video!' });
  }
};

module.exports = {
  store,
  update,
  show,
  index,
  destroy,
  recommendVideo,
};
