import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [keyStrokes, setKeyStrokes] = useState('')
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [clicks, setClicks] = useState(0)
  const [report, setReport] = useState(null)
  //local URL
  const APIURL ='http://localhost:3000';
  //on mount, set the session's timestamp
  useEffect(() => {
    axios.get(`${APIURL}/click/`).then(res => console.log(res)).finally(null)
    setArrival(new Date())}, [])
  //handle the session ending
  const handleReport = () => {
    const departureTime = new Date()
    const arrivalTime = arrival
    const handleSession = (arrDate, depDate) => {
      const ahr = String(arrDate.getHours())
      const amn = String(arrDate.getMinutes())
      const asc = String(arrDate.getSeconds())
      const dhr = String(depDate.getHours())
      const dmn = String(depDate.getMinutes())
      const dsc = String(depDate.getSeconds())
      const shr = dhr - ahr;
      const smn = dmn - amn;
      const ssc = dsc - asc;
      return `${shr}H:${smn}M:${ssc}S`
    }
    

    setReport(
      'session start: ' + arrivalTime + '\n' +
      'session end: ' + departureTime + '\n' + 
      'total session time: ' + handleSession(arrivalTime, departureTime) )
  }
  const handleKeyStrokes = (e) => {
    const newKey = e.target.value.charAt(e.target.value.length - 1)
    console.log('Key Stroke: ' + newKey)
    const newKeyArray = [keyStrokes]
    setKeyStrokes([...newKeyArray, newKey])
  }

  return (
 <>
<div className='container'>
    <div className='row'>
      <h1>Session Tracker</h1>
      <div className='col-12 text-col'>
        <h5>Type Some Text</h5>
        <textarea onKeyUp={handleKeyStrokes} defaultValue={keyStrokes} id='TextArea'></textarea>
        
      </div>
      <div className='col-12 buttons-col'>
        <h5>Click Some buttons</h5>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
      <div className='col-12 session-col'>
        <button onClick={handleReport}>End Session</button>
        
      </div>
      <div className='col-12 report-col'>
        {report == null ? <></> : 
          <div className='report'>
            <h5>Report</h5>
            <textarea className='report-block' readOnly={true} rows={30} cols={100} value={report}>
              
            </textarea>
          </div>}
      </div>
    </div>
</div>
  </>
  )
}

export default App
