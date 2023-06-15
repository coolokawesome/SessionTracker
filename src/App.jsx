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
  const APIURL ='http://localhost:3000';
  //on mount, set the session's timestamp
  useEffect(() => {
    axios.get(`${APIURL}/click/`).then(res => console.log(res)).finally(null)
    setArrival(new Date())}, [])

    const handleReport = async () => {
      try {
        setDeparture(new Date())
        const departureTime = departure
        const requestBody = new URLSearchParams();
        requestBody.append('departureTime', departureTime);
        requestBody.append('arrivalTime', arrival);
        requestBody.append('keyStrokes', keyStrokes);
        requestBody.append('keyNum', keyNum);
        requestBody.append('clicks', clicks)
    
        const response = await axios.post(`${APIURL}/report/timestamp`, requestBody);
        setReport(response.data)
      } catch (error) {
        console.error(error);
      }
    };
  //handle the session ending
  // const handlePostReport = () => {
  //   const departureTime = new Date()
  //   const arrivalTime = arrival
  //   const handleSession = (arrDate, depDate) => {
  //     const sessionDuration = depDate - arrDate; 
  //     const hours = Math.floor(sessionDuration / (1000 * 60 * 60));
  //     const minutes = Math.floor((sessionDuration % (1000 * 60 * 60)) / (1000 * 60));
  //     const seconds = Math.floor((sessionDuration % (1000 * 60)) / 1000);
  //     const formattedTime = `${hours}H:${minutes}M:${seconds}S`;
  //     return formattedTime;
  //   };
  //     setReport(
  //     'session start: ' + arrivalTime + '\n' +
  //     'session end: ' + departureTime + '\n' + 
  //     'total session time: ' + handleSession(arrivalTime, departureTime) + '\n' + 
  //     'keys pressed: ' + keyStrokes + '\n' + 
  //     'total keys pressed: ' + keyNum)
  // }


console.log(keyNum)
  const handleKeyStrokes = (e) => {
    const newKey = e.target.value.charAt(e.target.value.length - 1)
    console.log('Key Stroke: ' + newKey)
    const newKeyArray = [keyStrokes]
    setKeyStrokes([...newKeyArray, newKey])
    const newKeyNum = keyNum + 1
    setKeyNum(newKeyNum)
  } 
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
    <div className='row'>
      <h1>Productivity Monitor</h1>
      <div className='col-12 text-col'>
        <h5>Type Some Text</h5>
        <textarea onChange={handleKeyStrokes} defaultValue={keyStrokes} id='TextArea'></textarea>
        
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
            <h5>Session summary</h5>
            <textarea className='report-block' readOnly={true} rows={30} cols={80} value={report}>
            </textarea>
          </div>}
      </div>
    </div>
</div>
  </>
  )
}

export default App
