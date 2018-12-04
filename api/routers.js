const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const recordsController = require('./controllers/reportsController')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json({extended:true}));

let control = new recordsController()


//routes
router.post('/create-user',(control.createUser))
router.get('/', (control.homepage))
router.get('/red-flags',(control.getRedflags))
router.get('/users',(control.getUsersInfo))
router.get('/:createdBy/red-flags',(control.getSpecificUserPost))
router.get('/red-flags/:id',(control.getSpecificRedflag))
router.post('/red-flags',(control.createRedflagRecord))
router.patch('/red-flags/:id/comment',control.editComment)
router.patch('/red-flags/:id/location',control.editLocation)
router.delete('/red-flags/:id',control.deleteRecord)
router.patch('/red-flags/:id/location/:userId',control.editLocationByUser)
router.patch('/red-flags/:id/comment/:userId',control.editCommentByUser)
router.delete('/red-flags/:id/:userId',control.deleteRecordByUser)
module.exports = router



