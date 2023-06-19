import express from 'express'
import cors from 'cors'
import  bodyParser from 'body-parser';
const app = express()

const port = process.env.PORT || 3001
//cors and body parsing
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//post API endpoint 
app.post('/report/timestamp', (req, res) => {
    const body = req.body;
    // console.log('body: ' + req.body);
    const handleSession = (arrDate, depDate) => {
      const sessionDuration = depDate - arrDate;
      const hours = Math.floor(sessionDuration / (1000 * 60 * 60));
      const minutes = Math.floor((sessionDuration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((sessionDuration % (1000 * 60)) / 1000);
      const formattedTime = `${hours}H:${minutes}M:${seconds}S`;
      return formattedTime;
    };
    //construct the response 
    const report = `session start: ${body.arrivalTime}\n` +
      `session end: ${new Date()}\n` +
      `total session time: ${handleSession(new Date(body.arrivalTime), new Date())}\n` +
      `keys pressed: ${body.keyStrokes}\n` +
      `total keys pressed: ${body.keyNum}\n` +
      `total mouse clicks: ${body.clicks}`;

    // Send the report as plain text response
    res.type('text').send(report);
  });
  

app.listen(port, () => {
    console.log('listening')
})