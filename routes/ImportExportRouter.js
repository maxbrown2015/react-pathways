const router = require('express').Router();
const Course = require('../db/models/course');
const Pathway = require('../db/models/Pathway');

router.post('/importexport/export', (req, res) => {
  const { courses } = req.body;

  courses.sort((a, b) => {
    const aNum = Number(a.number);
    const bNum = Number(b.number);
    return aNum - bNum;
  });

  Course.remove({}, (err, data) => {
    if (err) {
      console.log(`Error removing courses${err}`);
    } else {
      console.log(`Successfully removed courses${data}`);
      courses.forEach((course) => {
        const courseModelItem = new Course({
          number: course.number,
          title: course.title,
          description: course.description,
          link: course.link,
          type: 'Lecture',
          instructor: 'Professor',
          selectedPathways: course.selectedPathways,
        });
        courseModelItem.save((err1, item) => {
          if (err1) {
            console.log(`Error ${err1} at course ${course}`);
          } else {
            console.log('Course saved sucessfully');
          }
        });
      });

      // add pathway
      const { pathways } = req.body;
      Pathway.remove({}, (err2, data1) => {
        if (err2) {
          console.log(err2);
        }
        pathways.forEach((pathway) => {
          const pathwayModelItem = new Pathway({
            name: pathway.name,
            id: pathway.id,
            color: pathway.color,
            highlight: pathway.highlight,
            description: pathway.description,
          });
          pathwayModelItem.save((err3, item) => {
            if (err3) {
              console.log(err3);
            }
            console.log('Pathway saved successfully');
          });
        });
      });
    }
  });
});

router.get('/importexport/import', (req, res) => {
  Course.find({}, (err, courses) => {
    if (err) {
      console.log(err);
    } else {
      Pathway.find({}, (err1, pathways) => {
        if (err) {
          console.log(err1);
        }
        res.json({ courses, pathways });
      });
    }
  });
});


module.exports = router;
