
/*
 * GET conversion page
 */

exports.index = function(req, res){
  res.render('index', {
    year: req.params.year,
    comparison_year: req.params.year2 || 2013,
  });
};
