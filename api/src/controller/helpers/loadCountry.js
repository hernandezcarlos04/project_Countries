const { Country } = require("../../db");
const axios = require("axios");

const loadCountriesToDB = async () => {
  //Buscando los registro de la DB
  const DBCountries = await Country.findAll();

  if (DBCountries.length) {
    return null;
  }

  await axios.get("https://restcountries.com/v3/all").then((response) =>

    response.data.map((coun) =>
      Country.findOrCreate({
        where: {
          id: coun.cca3 || "Unknown",
          name: coun.name.common || "Unknown",
          imageFlag: coun.flags[1]  || "Unknown",
          continent: coun.region || "Unknown",
          capitalCountry:  Array.isArray(coun.capital)?  coun.capital[0] : "unknow" ,
          subregion: coun.subregion || "Unknown",
          area: coun.area || 0,
          population: coun.population || 0,
          created: false,
        },
      })
      )
      );
};

module.exports = { loadCountriesToDB };


