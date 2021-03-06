var cpi0 = 1913;
var cpi = [9.9, 10, 10.1, 10.3, 11.6, 13.7, 16.5, 18.9, 19.4, 17.3, 16.9, 17.3, 17.3, 17.9, 17.7, 17.3, 17.1, 17.2, 16.1, 14.6, 13.1, 13.2, 13.4, 13.8, 14, 14.4, 14, 14, 14.1, 15.5, 16.9, 17.4, 17.8, 18.2, 21.5, 23.4, 24.1, 23.6, 25, 26.5, 26.7, 26.9, 26.7, 26.8, 27.6, 28.4, 28.9, 29.4, 29.8, 30, 30.4, 30.9, 31.2, 31.8, 32.9, 33.9, 35.5, 37.7, 39.8, 41.1, 42.5, 46.2, 51.9, 55.5, 58.2, 62.1, 67.7, 76.7, 86.3, 94, 97.6, 101.3, 105.3, 109.3, 110.5, 115.4, 120.5, 126.1, 133.8, 137.9, 141.9, 145.8, 149.7, 153.5, 158.6, 161.3, 163.9, 168.3, 174, 176.7, 180.9, 184.3, 190.3, 196.8, 201.8, 210.036, 210.228, 215.949, 219.179, 225.672, 229.601, 229.601];

var sahr0 = 1665;
var sahr = [0.049,0.049,0.052,0.054,0.050,0.050,0.050,0.050,0.048,0.051,0.044,0.045,0.046,0.044,0.044,0.050,0.052,0.042,0.042,0.042,0.046,0.043,0.043,0.039,0.040,0.041,0.043,0.040,0.038,0.040,0.037,0.043,0.043,0.040,0.044,0.043,0.045,0.041,0.041,0.047,0.042,0.045,0.043,0.034,0.041,0.037,0.036,0.034,0.037,0.033,0.038,0.035,0.038,0.035,0.038,0.035,0.033,0.034,0.035,0.036,0.041,0.038,0.040,0.037,0.037,0.037,0.033,0.030,0.031,0.030,0.031,0.030,0.031,0.032,0.029,0.030,0.042,0.037,0.033,0.030,0.029,0.030,0.033,0.038,0.039,0.039,0.039,0.040,0.039,0.037,0.036,0.035,0.037,0.040,0.046,0.044,0.040,0.043,0.043,0.040,0.041,0.044,0.043,0.041,0.043,0.046,0.044,0.050,0.047,0.044,0.042,0.048,0.059,0.076,0.067,0.076,0.061,0.067,0.059,0.057,0.053,0.052,0.051,0.049,0.049,0.050,0.052,0.053,0.055,0.060,0.069,0.073,0.070,0.068,0.068,0.069,0.070,0.059,0.062,0.065,0.065,0.067,0.064,0.069,0.068,0.068,0.073,0.074,0.088,0.097,0.085,0.077,0.074,0.070,0.070,0.065,0.062,0.065,0.058,0.053,0.055,0.055,0.055,0.052,0.051,0.051,0.048,0.047,0.047,0.047,0.049,0.051,0.053,0.051,0.051,0.048,0.048,0.045,0.041,0.041,0.042,0.042,0.046,0.043,0.042,0.043,0.042,0.043,0.043,0.047,0.048,0.047,0.048,0.046,0.046,0.046,0.049,0.056,0.069,0.087,0.090,0.088,0.082,0.078,0.075,0.072,0.067,0.067,0.066,0.063,0.060,0.059,0.058,0.055,0.055,0.057,0.057,0.057,0.056,0.054,0.053,0.052,0.052,0.052,0.051,0.050,0.050,0.050,0.050,0.047,0.047,0.047,0.046,0.046,0.046,0.047,0.047,0.047,0.049,0.049,0.049,0.050,0.052,0.051,0.050,0.052,0.052,0.053,0.052];

var max_year = cpi0 + cpi.length - 1;
var min_year = sahr0;

function calculate(y1, y2, dollars) {
  if (y1 < sahr0 || y2 < sahr0 || y1 > max_year || y2 > max_year)
    return -1;
  return sahrWrapper(y1, y2, dollars);
}

function getSahrMultiplier(year) {
  // 2004 multipler
  var ret = sahr[year - sahr0];
  return ret;
}

function getCPI(year) {
  return cpi[year - cpi0];
}

function sahrWrapper(y1, y2, dollars) {
  if (y1 < cpi0) {
    dollars /= getSahrMultiplier(y1);
    y1 = 2004;
    return sahrWrapper(y1, y2, dollars);
  }

  if (y2 < cpi0) {
    var in_2004_dollars = cpiWrapper(y1, 2004, dollars);
    // convert 2004 dollars to requested year
    return (in_2004_dollars * getSahrMultiplier(y2)).toFixed(0);
  }

  return cpiWrapper(y1, y2, dollars).toFixed(2);
}

function cpiWrapper(y1, y2, dollars) {
  var factor = getCPI(y2) / getCPI(y1);
  var enddollars = dollars * factor;
  return enddollars;
}

module.exports = {
  calculate: calculate,
  min_year: min_year,
  max_year: max_year,
};
