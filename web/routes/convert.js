var compare = require('../../lib/calc.js');

var DEFAULT_AMOUNT = 100;
var CURRENT_YEAR = 1900 + new Date().getYear();

/*
 * GET conversion page
 */

exports.index = function(req, res){
  try {
    var y1 = parseInt(req.params.year);
    var y2 = req.params.year2 ? parseInt(req.params.year2) : CURRENT_YEAR;
    var amount = req.query.amount ? parseFloat(req.query.amount) : DEFAULT_AMOUNT;
  }
  catch (ex) {
    // TODO some error
  }

  if (y1 === y2) {
    // just change y2 to 2013
    y2 = CURRENT_YEAR;
  }

  var converted_amount = compare.calculate(y1, y2, amount);
  if (converted_amount < 0) {
    // TODO some error
  }

  var pct;
  var factor;
  var amount_diff = Math.abs(amount - converted_amount);
  if (y1 < y2) {
    factor = converted_amount / amount;
  }
  else {
    factor = amount / converted_amount;
  }

  var pct_per_year = Math.pow(factor, 1/Math.abs(y1 - y2));
  pct_per_year = (pct_per_year-1) * 100;
  pct_per_year = Math.abs(pct_per_year).toFixed(2);

  var deflation;
  if (y1 < y2) {
    deflation = amount > converted_amount;
  }
  else {
    deflation = amount < converted_amount;
  }

  var max_year = Math.max(y1, y2);
  var min_year = Math.min(y1, y2);
  res.render('index', {
    year: y1,
    comparison_year: y2,
    max_year: max_year,
    min_year: min_year,
    amount: amount,
    converted_amount: converted_amount,
    pct: pct_per_year,
    deflation: deflation,
    pre_1913: min_year < 1913,
  });
};
