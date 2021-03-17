const { Router } = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../middlewares/validators/auth');
const validate = require('../middlewares/validators/validationResult');

const router = Router();

router.post(
    '/register',
    validate(authValidator.register),
    authController.register_an_account
);
router.post(
    '/login',
    validate(authValidator.login),
    authController.login_an_account
);
router.post(
    '/refresh',
    validate(authValidator.refresh),
    authController.refresh_access_token
);
router.post(
    '/check',
    validate(authValidator.check_email),
    authController.check_email_available
);
router.get('/imageauth', authController.authenticate_imagekit);

module.exports = router;