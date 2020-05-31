const { Router } = require('express');

const router = Router();
const UserController = require('../../controllers/User/index');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.get('/user/:id', UserController.show);
router.get('/users', UserController.index);
router.delete('/user/:id', UserController.destroy);


// Logic of the user videos
router.patch('/recommend_video/:userId/:videoId', UserController.recommendVideo);

module.exports = router;
