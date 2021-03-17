const { Router } = require('express');
const publicController = require('../controllers/public');
const publicValidator = require('../middlewares/validators/public');
const validate = require('../middlewares/validators/validationResult');
const auth = require('../middlewares/auth');

const router = Router();

//Application Routes
// router.use('/admins', auth, require('./admin'));

router.get('/countries', publicController.get_selected_countries);
router.get(
    '/countries/:id',
    validate(publicValidator.check_id),
    publicController.get_a_country
);

router.get(
    '/states', 
    validate(publicValidator.state_search_rules),
    publicController.get_selected_states);
router.get(
    '/states/:id',
    validate(publicValidator.check_id),
    publicController.get_a_state
);

router.get(
    '/cities', 
    validate(publicValidator.city_search_rules),
    publicController.get_selected_cities
    );
router.get(
    '/cities/:id',
    validate(publicValidator.check_id),
    publicController.get_a_city
);

//Base Route
router.get('/', (req, res) => res.sendStatus(200));

//Page Not Found
router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;