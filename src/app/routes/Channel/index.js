const { Router } = require('express');

const router = Router();
const ChannelController = require('../../controllers/Channel/index');

router.post('/channel', ChannelController.store);
router.put('/channel/:id', ChannelController.update);
router.get('/channel/:id', ChannelController.show);
router.get('/channels', ChannelController.index);
router.delete('/channel/:id', ChannelController.destroy);

module.exports = router;
