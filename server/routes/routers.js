const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const recordsController = require('../controllers/reportsController.js')
const dotenv = require('dotenv');
const { auth } = require('../middleware/reportsMiddleware');


dotenv.config();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json({extended:true}));

let control = new recordsController()


//post routes
router.post('/auth/sign-up',(control.signup))
router.post('/auth/login',control.login)
router.post('/record',auth.verifyToken,(control.createRecord))

//GET routes
router.get('/', (control.homepage))
router.get('/red-flags',auth.verifyToken,(control.getRedflags))
router.get('/interventions',auth.verifyToken,(control.getInterventions))
router.get('/users',auth.verifyToken,(control.getUsersInfo))
router.get('/posts',auth.verifyToken,(control.getSpecificUserPost))
router.get('/red-flags/:id',auth.verifyToken,(control.getSpecificRedflag))
router.get('/interventions/:id',auth.verifyToken,(control.getSpecificIntervention))

//PATCH routes
router.patch('/red-flags/:id/comment',auth.verifyToken,control.editRedflagStory)
router.patch('/red-flags/:id/location',auth.verifyToken,control.editRedflagLocation)
router.patch('/red-flags/:id/status',auth.verifyToken,control.editRedflagStatus)
router.patch('/interventions/:id/status',auth.verifyToken,control.editInterventionStatus)
router.patch('/interventions/:id/comment',auth.verifyToken,control.editInterventionStory)
router.patch('/interventions/:id/location',auth.verifyToken,control.editInterventionLocation)

//DELETE routes
router.delete('/interventions/:id',control.deleteInterventionRecord)
router.delete('/red-flags/:id',control.deleteRedflagRecord)
router.delete('/users/:id',control.deleteUser)

module.exports = router

