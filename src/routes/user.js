const router = require('express').Router();
const user = require('../controllers/user_controller');

// Variables
const endPoint = '/user';
// Get
router.get(endPoint, user.getUser);
router.get(`${ endPoint }/:userId`, user.getUserById);

// Post
router.post(`${ endPoint }/singup`, user.createUsers);
router.post(`${ endPoint }/singin`, user.login);
router.post(`${ endPoint }/check/email`, user.checkEmail);

// Put
router.put(endPoint, user.updateUserById);
router.put(`${ endPoint }/pass`, user.updatePassById);
// Delete


// Export
module.exports = router;