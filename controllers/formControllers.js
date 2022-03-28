const formidable = require('formidable');
const formControllers = {
  getForm: async (req, res) => {
    res.sendFile(__dirname + '/index.html');
  },
  uploadFile: (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log('name : ', files);
      res.write('File uploaded');
      res.end();
    });
    // form.on('fileBegin', function (name, file) {
    //   file.push = __dirname + '/uploads/' + file.name;
    // });
    form.on('file', function (name, file) {
      if (file.name === undefined) {
        return res
          .status(400)
          .json({ msg: 'Veuillez sélectionner un fichier' });
      }
      console.log('Uploaded file : ', file.name);
    });
    res.sendFile(__dirname + '/index.html');
  },
};

module.exports = formControllers;
