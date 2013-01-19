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
    var amount = req.query.amount ? parseInt(req.query.amount) : DEFAULT_AMOUNT;
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

  var amount_diff = Math.abs(amount - converted_amount);

  var pct;
  if (y1 > y2) {
    pct = amount_diff / converted_amount * 100;
  }
  else {
    pct = amount_diff / amount * 100;
  }

  var pct_per_year = pct / Math.abs(y1 - y2);
  pct_per_year = pct_per_year.toFixed(1);

  var what_happen;
  var max_year = Math.max(y1, y2);
  var min_year = Math.min(y1, y2);
  if (y1 === max_year) {
    what_happen = amount < converted_amount ? 'deflation' : 'inflation';
  }
  else {
    what_happen = amount < converted_amount ? 'inflation' : 'deflation';
  }

  res.render('index', {
    year: y1,
    comparison_year: y2,
    max_year: max_year,
    min_year: min_year,
    amount: amount,
    converted_amount: converted_amount,
    pct: pct_per_year,
    what_happen: what_happen,
  });
};
