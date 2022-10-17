import express from 'express'
import { authController } from './controllers/authController'
import { categoriesControllers } from './controllers/categoriesControler'
import { coursesController } from './controllers/coursesController'
import { episodesController } from './controllers/episodesController'

const router = express.Router()

router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)

router.get('/categories', categoriesControllers.index)
router.get('/categories/:id', categoriesControllers.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', coursesController.search)
router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }   