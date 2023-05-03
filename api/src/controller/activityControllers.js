const { Activity, Country} = require('../db')
const {  activityExistanceCheck } = require('../controller/helpers/activityExistanceCheck');
const { dbParser } = require('../controller/helpers/dbparser');


const getActivity = async (req, res) => {
    if(req.query.name) {
        const activity = await Activity.findOne({
            where: {
                name: req.query.name
            }
        });

        const countryCodes = [];
    
        const match = await country_activity.findAll({
            where: {
                activityId: activity.id
            }
        })

        for(let i = 0; i < match.length; i++) {
            const countryName = await Country.findOne({
                where: {
                    id: match[i].countryId
                }
            })
            countryCodes.push(countryName.name)
        }
        return res.json(countryCodes);
    }

    const activities = await Activity.findAll();
    
    return res.json(activities);

}

const postActivity = async (req, res) => {

    try {
        const postAct = await createActivity  ( req.body, req.body.countryId );
        res.status(201).json(postAct)
    } catch (error) {
        res.status(404).json({error: error.message})
    }

    // const {name, level, length, season, countryId} = req.body;
   
    // if(await activityExistanceCheck(name, level, length, season)) {
    //     return res.status(201).json('The activity already exists');
    // };

    // const newActivity = await Activity.findOrCreate({
    //     where: {
    //         name: name,
    //         level: level,
    //         length: length,
    //         season: season,

    //     }
    // });

    // for(let i = 0; i < countryId.length; i++) {
    //     const match = await Country.findOne({
    //         where: {
    //             name: countryId[i]
    //         }
    //     })
        
    //     await newActivity.addCountry(match);
        
    // }
    
    // return newActivity, res.json('Activity created')
}



const createActivity= async (act, pa)=>{
    

    const {name, level, length, season} = act;
    if(await activityExistanceCheck(name, level, length, season)) {
        return msg=('The activity already exists');
    };
    const newAct = await Activity.create({name, level, length, season});
    const id = dbParser(pa, true)
    let dbCountry = await Country.findOne({
        where: {
            id: id
        }
    });

    await dbCountry.addActivity(newAct)
    //console.log(dbCountry)
    
    return dbCountry

}

module.exports = { getActivity, postActivity };



