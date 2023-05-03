const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require('./countryRoute');
const activityRoute = require('./activityRoute')


const router = Router();
//console.log("entre a rutras ")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRoute);
router.use('/activities', activityRoute);


module.exports = router;
