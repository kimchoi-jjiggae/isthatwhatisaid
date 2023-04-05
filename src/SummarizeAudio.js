import React from "react";
import { useState, useEffect } from 'react';
import './App.css';

//components
// import Question from "../deprecated/Question";

import axios from "axios";

// import Loading from "./Loading";
// import OutputRecForm from "../deprecated/OutputRecForm";


//images

import paste from './images/paste.svg'
// import select from './images/select.svg'
// import write from './images/write.svg'






function RecForm() {



    const [prompt, setPrompt] = useState("");

    const [response, setResponse] = useState("");
    const [name, setName] = useState()
    const [relationship, setRelationship] = useState()
    const [company, setCompany] = useState()

    const [description, setDescription] = useState()
    const [accomplishments, setAccomplishments] = useState()
    const [skills, setSkills] = useState()
    const [style, setStyle] = useState()
    const [words, setWords] = useState(300)

    const [isLoading, setIsLoading] = useState(false)
    const [hasCalledAPI, setHasCalledAPI] = useState(false)
    const [url, setURL] = useState("")
    const [descriptionPlaceholder, setDescriptionPlaceholder] = useState()


    const handleSubmit = (e) => {
        e.preventDefault();


        setPrompt(prevPrompt => {
            const updatedPrompt = `write me a letter of recommendation with a ${style} style in ${words} words for a candidate named ${name} with these accomplishments: ${accomplishments} and these skills: ${skills} who is applying for with this job description ${description} who I have the following relationship with: ${relationship}`;
            console.log(updatedPrompt); // this will log the updated prompt value
            return updatedPrompt;
        });

        setIsLoading(true)
        setHasCalledAPI(false)

        // console.log(document.getElementById("Loading"))

        // targetRef.current.scrollIntoView({ behavior: 'auto' })

        setTimeout(()=> 
        {window.scrollBy({
            top: 800,
            behavior: "smooth"
        })
    }, 
    1500)
}



    useEffect(() => {
        if (prompt !== "") {
            axios
                .post("http://localhost:8080/chat", { prompt })
                .then((res) => {
                    setHasCalledAPI(true)
                    setIsLoading(false)
                    console.log(res)
                    setResponse(prevRes => {
                        let newRes = res.data;
                        return newRes;
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        }

    }, [prompt])





    return (
        <div>
            <div className="formTitle">
                <h1 className="headTitle">Is that what I said?</h1>
                <h2 className="headSub"> Let's transcribe and summarize!</h2>
                {/* <p className="headP">Please answer as many questions as possible</p> */}
            </div>

            <br />
            <br />

            <form className="inputForm" onSubmit={handleSubmit}>


                <div className="questionBox">

                    <img src={paste} className="numberSize" />
                    <div className="questionBoxText">
                        <label className="label">Upload the audio file here. TO DO: LIST SUPPORTED FILE TYPES!</label>
                        <div className="submitLink">
                            <input name="description" id="jobDescription" className="input" placeholder="Your audio file transcription will appear here. " ></input>
                            <button onClick={(e)=> 
                                {
                                    e.preventDefault()
                                    setURL(document.getElementById("jobDescription").value)
                                    // console.log(document.getElementById("jobDescription").value)
                                }
                                } className="button-29">Upload</button>
                        </div>

                    </div>

                </div>

                <br />



                {/* options */}

                {/* <h1 style={{ textAlign: "center", color: "#F67062" }}>Options</h1>

                <div className="writingStylesDiv" >
                    <img src={select} className="numberSize" />
                    <label className="subLabel">Writing Styles</label>


                    <br />

                    <div style={{ display: "flex" }}>
                        <div className="styleContainer" onChange={(e) => setStyle(e.target.id)}>
                            <input type="radio" id="formal" name="writingStyle" ></input>
                            <label htmlFor="formal">
                                <h2>Formal</h2>
                                <p>Professional tone.</p>
                                <p>Often used for academic or job-related recommendations.</p>
                            </label>
                        </div>

                        <br />

                        <div className="styleContainer" onChange={(e) => setStyle(e.target.id)}>
                            <input type="radio" id="narrative" className="radioButton" name="writingStyle"></input>
                            <label htmlFor="narrative" >
                                <h2>Narrative</h2>
                                <p>Storytelling format, highlighting the person’s achievements and qualities through anecdotes and examples.</p>
                                <p>Often used for personal recommendations.</p>
                            </label>
                        </div>
                    </div>

                    <br />

                    <div style={{ display: "flex" }}>
                        <div className="styleContainer" onChange={(e) => setStyle(e.target.id)}>
                            <input type="radio" id="bulletPoint" className="radioButton" name="writingStyle"></input>
                            <label htmlFor="bulletPoint" >
                                <h2>Bullet Point</h2>
                                <p>Structured with short, concise statements that highlight the person’s skills and achievements.</p>
                                <p>Often used when the recipient requires a quick summary of the person’s qualifications.</p>
                            </label>
                        </div>

                        <br />

                        <div className="styleContainer" onChange={(e) => setStyle(e.target.id)}>
                            <input type="radio" id="comparative" className="radioButton" name="writingStyle"></input>
                            <label htmlFor="comparative" >
                                <h2>Comparative</h2>
                                <p>Compares the person to others in their field, highlighting their strengths and qualifications. </p>
                                <p>Often used in academic or job-related recommendations.</p>
                            </label>
                        </div>

                    </div> */}


            </form >

            <br />
            <br />

            <div id="Loading">
                {isLoading ? <h1>"Worked!"</h1> : null}
            </div>


            {hasCalledAPI ? <h1>"DIDNT WORK!"</h1> : null}


        </div >
    )
}

export default RecForm