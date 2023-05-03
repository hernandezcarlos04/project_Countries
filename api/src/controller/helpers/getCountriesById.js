const { Country, Activity, country_activity } = require('../../db');
const { dbParser } = require('../helpers/dbparser');

module.exports = async(req, res) => {
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

    result = await {...dbCountry, activities: activitiesDetail}

    return res.json(result);
}