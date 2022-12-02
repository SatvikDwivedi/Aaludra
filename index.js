const express = require('express');
const bodyParser = require('body-parser');
const { PDFDocument } = require('pdf-lib')
const cors = require('cors');
const fs = require('fs')
const util = require('util')
const { ToWords } = require('to-words');
const commafy = require('commafy')
const date = require('date-and-time');

const app = express();
const toWords = new ToWords();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/cco-pdf', (req, res) => {
    const data = {
        "Date" : date.format(new Date(req.body.date), 'DD-MMM-YYYY'),
        "Name": req.body.title + '. ' + req.body.firstName + ' ' + req.body.lastName + ',',
      "Address" : req.body.address,
      "Pincode" : req.body.pinCode,
      "Role" : req.body.role,
      "Date1" : date.format(new Date(req.body.startDate), 'DD-MMM-YYYY'),
      "Salary" : commafy(req.body.epm),
      "Words" : 'Rupees ' + toWords.convert(req.body.epm) + ' Only'
    }
    async function createPdf(input, output) {
        const readFile = util.promisify(fs.readFile)
        function getStuff() {
          return readFile(input)
        }
        const file = await getStuff()
        const pdfDoc = await PDFDocument.load(file)
        const form = pdfDoc.getForm()
        Object.keys(data).forEach((element) => {
          const field = form.getTextField(element)
          field.setText(data[element])
        })
        const pdfBytes = await pdfDoc.save()
        fs.writeFile(output, pdfBytes, () => {
          console.log('PDF created!')
        })
      }
      createPdf("co.pdf", "oco.pdf")
      res.send(Promise.resolve());
    console.log(data)

});

app.get('/fco-pdf', (req, res) => {
    res.sendFile(`${__dirname}/oco.pdf`)
})

app.post('/cofe-pdf', (req, res) => {
    const data = {
        "Date" : date.format(new Date(req.body.date), 'DD-MMM-YYYY'),
      "Name": req.body.title + '. ' + req.body.firstName + ' ' + req.body.lastName + ',',
      "Address" : req.body.address,
      "Pincode" : req.body.pinCode,
      "Role" : req.body.role,
      "Date1" : date.format(new Date(req.body.startDate), 'DD-MMM-YYYY') + '.',
      "Salary" : commafy(req.body.gepm),
      "Words" : 'Rupees ' + toWords.convert(req.body.gepm) + ' Only'
    }
    async function createPdf(input, output) {
        const readFile = util.promisify(fs.readFile)
        function getStuff() {
          return readFile(input)
        }
        const file = await getStuff()
        const pdfDoc = await PDFDocument.load(file)
        const form = pdfDoc.getForm()
        Object.keys(data).forEach((element) => {
          const field = form.getTextField(element)
          field.setText(data[element])
        })
        const pdfBytes = await pdfDoc.save()
        fs.writeFile(output, pdfBytes, () => {
          console.log('PDF created!')
        })
      }
      createPdf("ofe.pdf", "oofe.pdf")
      res.send(Promise.resolve());
    console.log(data)

});

app.get('/fofe-pdf', (req, res) => {
    res.sendFile(`${__dirname}/oofe.pdf`)
})

app.listen(port, () => console.log(`Listening on port ${port}`));