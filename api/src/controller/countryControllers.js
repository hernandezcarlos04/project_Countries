const { Country, Activity, country_activity} = require('../db')
const {loadCountriesToDB} = require('./helpers/loadCountry');
const { dbParser } = require('./helpers/dbparser');
const { Op } = require('sequelize');

const getCountries = async (req, res) => {
    await loadCountriesToDB();
    
    let queryParam = req.query.name;
   // console.log("entre a controller  "+ req.params)

    if (queryParam) {
        const parsedQueryParam = dbParser(queryParam);
        //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa'+queryParam)
        let match = await Country.findAll({
            where: {
                name: {
                    [Op.substring]: queryParam

                }
            },
            include: {
                model: Activity,
                attributes: ['id','name','level','length','season'],
            },
        })

        //console.log(Activity)        

        let match2 = await Country.findAll({
            where: {
                name: {
                    [Op.substring]: parsedQueryParam
                },
            }
        })

        match = match.concat(match2);

        if (!match.length) {
            return res.json('country not found')
        } else {
            return res.json(match);
        }
    }

    const match = await Country.findAll();

    return res.json(match);
}

const getCountryById = async(req, res) => {
    // console.log("entereeeeeeeeeeeeeeeeeeeeee")
    const idCount = req.params.idPais
    // console.log('jolkkkkkkkkkkkkkkkk  +'+idCount)
    const id = dbParser(idCount, true)
    let activitiesId = [];
    let activitiesDetail = [];
    let result = {};

    let dbCountry = await Country.findOne({
        where: {
            id: id
        }
    });

    const dbActivities = await country_activity.findAll({
        where: {
            countryId: id
        }
    });

    for(let i = 0; i < dbActivities.length; i++) {
        activitiesId.push(dbActivities[i].dataValues.activityId);
    }

    for(let i = 0; i < activitiesId.length; i++) {
        const match = await Activity.findOne({
            where: {
                id: activitiesId[i]
            }
        });
        activitiesDetail.push(match.dataValues);
    }

    result = await {...dbCountry.dataValues, activitiesDetail}

    return res.json(result);
}

module.exports = {getCountries, getCountryById}

