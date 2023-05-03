const {Router} = require('express');
const {postActivity, getActivity} = require('../controller/activityControllers')

const activityRoute = Router();

activityRoute.get('/', getActivity)
activityRoute.post('/', postActivity)

module.exports = activityRoute;

