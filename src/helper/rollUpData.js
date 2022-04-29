import * as d3 from "d3";

export function rollData(data) {
  const jhuCases = d3.rollup(
    data[0],
    (v) => d3.sum(v, (d) => d.Confirmed),
    (d) => d.Country_Region
  );

  const jhuDeaths = d3.rollup(
    data[0],
    (v) => d3.sum(v, (d) => d.Deaths),
    (d) => d.Country_Region
  );

  const jhuRecovered = d3.rollup(
    data[0],
    (v) => d3.sum(v, (d) => d.Recovered), //changed this from recoved to recovered
    (d) => d.Country_Region
  );

  const jhuIncidentRate = d3.rollup(
    data[0],
    (v) => d3.sum(v, (d) => d.Incident_Rate),
    (d) => d.Country_Region
  );

  const jhuCaseFatalityRatio = d3.rollup(
    data[0],
    (v) => d3.sum(v, (d) => d.Case_Fatality_Ratio),
    (d) => d.Country_Region
  );

  const jhuDosesAdministered = d3.rollup(
    data[5],
    (v) => d3.sum(v, (d) => d.Doses_admin),
    (d) => d.Country_Region
  );

  const jhuPartiallyVaccinated = d3.rollup(
    data[5],
    (v) => d3.sum(v, (d) => d.People_partially_vaccinated),
    (d) => d.Country_Region
  );

  const jhuFullyVaccinated = d3.rollup(
    data[5],
    (v) => d3.sum(v, (d) => d.People_fully_vaccinated),
    (d) => d.Country_Region
  );

  let tempArr = [];

  for (const [k, v] of jhuCases.entries()) {
    tempArr.push({
      country: k,
      cases: v,
      deaths: jhuDeaths.get(k),
      recovered: jhuRecovered.get(k),
      // Incident_Rate: Incidence Rate = cases per 100,000 persons.
      incidentRate: jhuIncidentRate.get(k),
      // Case_Fatality_Ratio (%): Case-Fatality Ratio (%) = Number recorded deaths / Number cases.
      caseFatalityRatio: jhuCaseFatalityRatio.get(k),
      dosesAdmin: jhuDosesAdministered.get(k),
      partiallyVacc: jhuPartiallyVaccinated.get(k),
      fullyVacc: jhuFullyVaccinated.get(k),
      population: parseInt(
        data[4].find((d) => d.Country_Region === k).Population
      ),
      iso3: data[4].find((d) => d.Country_Region === k).iso3,
      long: data[4].find((d) => d.Country_Region === k).Long_,
      lat: data[4].find((d) => d.Country_Region === k).Lat,
    });
  }

  tempArr = tempArr.filter((d) => {
    return d.iso3 != "";
  });

  return tempArr;
}
