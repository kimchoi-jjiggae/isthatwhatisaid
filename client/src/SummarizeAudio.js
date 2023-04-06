import React, { useState } from 'react';
import axios from 'axios';
import Transcript from './Transcript';




function SummarizeAudio() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionPlaceholder, settranscriptionPlaceholder] = useState("Your transcription will go here.");
  const [transcriptionvalue, settranscriptionValue] = useState(null)
  //   const [transcription, placehol]

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      alert('Please select a file to upload.');
      return;
    }

    // Create a new form data object
    const formData = new FormData();

    // Append the audio file to the form data object
    formData.append('audio', audioFile);

    // Send the form data to the backend server
    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log the response from the server
      console.log(response.data)
      
      settranscriptionPlaceholder(response.data["text"])

    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Upload Audio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="audio">Select an MP3 file:</label>
          <input type="file" id="audio" name="audio" accept=".mp3" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="questionBox">
        <div className="questionBoxText">
            <textarea
            placeholder={transcriptionPlaceholder}
            onChange={(e) => settranscriptionValue(e.target.value)}
            name="transcription"
            className="textareaInput"
            rows="10"
            ></textarea>
        </div>
        </div>
    </div>
  );
}

// export default UploadAudio;


// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from "axios";
// import paste from './images/paste.svg'

// function SummarizeAudio() {

//     const [prompt, setPrompt] = useState("");
//     const [response, setResponse] = useState("");
//     const [transcription, settranscription] = useState();
//     const [words, setWords] = useState(300);
//     const [isLoading, setIsLoading] = useState(false);
//     const [hasCalledAPI, setHasCalledAPI] = useState(false);
//     const [url, setURL] = useState("TESTING");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const data = {
//             url
//         };
//         axios
//           .post('/submit', data)
//           .then((response) => {
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//     };
    
//     useEffect(() => {
//         if (prompt !== "") {
//             axios
//                 .post("http://localhost:8080/chat", { prompt })
//                 .then((res) => {
//                     setHasCalledAPI(true)
//                     setIsLoading(false)
//                     console.log(res)
//                     setResponse(prevRes => {
//                         let newRes = res.data;
//                         return newRes;
//                     });
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                 });
//         }
//     }, [prompt])

//     return (
//         <div>
//             <div className="formTitle">
//                 <h1 className="headTitle">Is that what I said?</h1>
//                 <h2 className="headSub"> Let's transcribe and summarize!</h2>
//             </div>

//             <br />
//             <br />

//             <form className="inputForm" onSubmit={handleSubmit}>
//                 <div className="questionBox">
//                     <div className="questionBoxText">
//                         <label className="label">Upload the audio file here. TO DO: LIST SUPPORTED FILE TYPES!</label>
//                         <div className="submitLink">
//                             <input name="transcription" id="jobtranscription" className="input" placeholder="Your audio file transcription will appear here. " ></input>
//                             <button onClick={(e) => { 
//                                 e.preventDefault();
//                                 const data = {
//                                     file: e.target.parentNode.childNodes[0].value
//                                 };
//                                 axios
//                                     .post('/submit', data)
//                                     .then((response) => {
//                                         console.log(response.data['file']);
//                                         // let file_to_upload = response.data['file']

//                                     })
//                                     .catch((error) => {
//                                         console.log(error);
//                                     });
//                             }}>
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </form >

//             <br />
//             <br />

//             <div id="Loading">
//                 {isLoading ? <h1>"Worked!"</h1> : null}
//             </div>

//             {hasCalledAPI ? <h1>"DIDNT WORK!"</h1> : null}

//         </div >
//     )


export default SummarizeAudio
