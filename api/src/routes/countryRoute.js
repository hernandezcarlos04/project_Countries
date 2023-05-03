const {Router} = require('express');
const {getCountries, getCountryById}  = require('../controller/countryControllers')
//const getCountryById = require('../controller/helpers/getCountriesById')

const countryRoute = Router();

countryRoute.get('/', getCountries )
countryRoute.get('/:idPais', getCountryById   )



module.exports = countryRoute;