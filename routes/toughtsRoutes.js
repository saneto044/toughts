const express = require('express');
const router = express.Router();
const ToughtsController = require('../controller/ToughtController')
//Import helpers
    const checkAuth = require('../helpers/auth').checkAuth;

router.get('/' , ToughtsController.showToughts);
router.get('/dashboard', checkAuth ,ToughtsController.dashboard);
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/add' , checkAuth , ToughtsController.createdTought);
router.post('/add' , checkAuth , ToughtsController.createdToughtSave);
router.get('/edit/:id',checkAuth, ToughtsController.updateTought);
router.post('/edit',checkAuth, ToughtsController.updateToughtSave)
module.exports = router