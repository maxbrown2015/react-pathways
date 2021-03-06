const express = require('express');
const app = express();
const router = express.Router();
const Course = require('../public/models/course');
const Pathway = require('../public/models/Pathway');

router.route('/import').get(function (req, res) {
  Course.find((err, courses) => {
    if (err) {
      console.log(err);
    } else {
      Pathway.find((err, pathways) => {
        if (err) {
      console.log(err)
      ;}
        res.json({
          courses: courses,
          pathways: pathways,
        });
      });
    }
  });
});

module.exports = router;