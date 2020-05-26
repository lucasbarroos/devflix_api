const { Router } = require('express');

const router = Router();
const VideoController = require('../../controllers/Video/index');

router.post('/video', VideoController.store);
router.put('/video/:id', VideoController.update);
router.get('/video/:id', VideoController.show);
router.get('/videos', VideoController.index);
router.delete('/video/:id', VideoController.destroy);

module.exports = router;
