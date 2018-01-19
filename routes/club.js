// import {Router} from 'express'
// import * as ClubController from '../controllers/club.controller'
// const router = new Router()

const Router = require('express').Router
const ClubController = require('../controllers/club.controller')
const router = new Router()

//Get all clubs
router.route('/clubs').get(ClubController.getClubs)