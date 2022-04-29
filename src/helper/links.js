const jhuDailyReports = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${generateDate(
  1
)}.csv`;

const jhuTSeriesConfirmed =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

const jhuTSeriesDeaths =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

const jhuTSeriesRecovered =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

const uID_ISO_FIPS_LookUp_Table =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/UID_ISO_FIPS_LookUp_Table.csv";

const vaccineTSeries =
  "https://raw.githubusercontent.com/govex/COVID-19/master/data_tables/vaccine_data/global_data/time_series_covid19_vaccine_global.csv";

function generateDate(daysPast) {
  const todayDate = new Date();

  const yesterdayDate = new Date(todayDate);

  yesterdayDate.setDate(todayDate.getDate() - daysPast);

  const dd = String(yesterdayDate.getDate()).padStart(2, "0");
  const mm = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
  const yyyy = yesterdayDate.getFullYear();

  return mm + "-" + dd + "-" + yyyy;
}

export {
  jhuDailyReports,
  jhuTSeriesConfirmed,
  jhuTSeriesDeaths,
  jhuTSeriesRecovered,
  uID_ISO_FIPS_LookUp_Table,
  vaccineTSeries,
};
