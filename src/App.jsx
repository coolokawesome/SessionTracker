import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [keyStrokes, setKeyStrokes] = useState('')
  const [keyNum, setKeyNum] = useState(0)
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [clicks, setClicks] = useState(0)
  const [report, setReport] = useState(null)
  //local URL
  const APIURL =`${window.location.href}:3000`;
  //on mount, set the session's timestamp
  useEffect(() => {
    setArrival(new Date())
  }, [])

  const handleReport = async () => {
    try {
      setDeparture(new Date()) 
      //send all the states to the req body
      const departureTime = departure
      const requestBody = new URLSearchParams();
      requestBody.append('departureTime', departureTime);
      requestBody.append('arrivalTime', arrival);
      requestBody.append('keyStrokes', keyStrokes);
      requestBody.append('keyNum', keyNum);
      requestBody.append('clicks', clicks)
      console.log(requestBody)
      //await the response and set the data to the 'report' state
      const response = await axios.post( `${APIURL}/report/timestamp`, requestBody);
      setReport(response.data)
      //catch any errors
    } catch (error) {
      console.error(error);
    }
  };
  //logging keys triggered and total num of keys pressed
console.log(keyNum)
  const handleKeyStrokes = (e) => {
    const newKey = e.target.value.charAt(e.target.value.length - 1)
    console.log('Key Stroke: ' + newKey)
    const newKeyArray = [keyStrokes]
    setKeyStrokes([...newKeyArray, newKey])
    const newKeyNum = keyNum + 1
    setKeyNum(newKeyNum)
  } 
  //handle every mouse click event that occurs within a session
   useEffect(() => {
    const handleMouseClick = () => {
      setClicks((prevCounter) => prevCounter + 1);
    };document.addEventListener('click', handleMouseClick);
    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
 <>
  <div className='container'>
  <h1 className=''>Event Recorder Demo</h1>
      <div className='row main-row'>
        
        <div className='col-6 text-col'>
          <div className='text-area'>
          <h5>Type Some Text</h5>
          <textarea className='text-area' rows={10} onChange={handleKeyStrokes} defaultValue={keyStrokes} id='TextArea'></textarea>
          </div>
          
        </div>
        <div className='col-6 '>
          <h5>Click Some buttons</h5>
          <div className='buttons-col'>
          <button className='btn-2'>Primary</button>
          <button className='btn-3'>Secondary</button>
          </div>
        </div>
        <div className='col-12 session-col'>
          <button className='btn-1' onClick={handleReport}>Get Session Summary</button>
          
        </div>
        <div className='col-12 report-col'>
          {report == null ? <></> : 
            <div className='report'>
              <h5>Session summary</h5>
              <textarea className='report-block' readOnly={true} rows={15} value={report}>
              </textarea>
            </div>}
        </div>
      </div>
  </div>
  </>
  )
}

export default App
