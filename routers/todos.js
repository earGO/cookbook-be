const express = require('express'),
    router = express.Router();
import { showAllToday } from '../controllers/todos/index';

router.get('/:date', showAllToday);

module.exports = router;