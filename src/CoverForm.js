import React from "react";
import { useState, useEffect } from 'react';
import './App.css';

//components
// import Question from "./Question";

import axios from "axios";

import Loading from "./Loading";
// import OutputCoverForm from "./OutputCoverForm";


//images

import paste from './images/paste.svg'
import select from './images/select.svg'
import write from './images/write.svg'






function CoverForm() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    

    const [isLoading, setIsLoading] = useState(false)
    const [hasCalledAPI, setHasCalledAPI] = useState(false)
    const [url, setURL] = useState("")
    const [descriptionPlaceholder, setDescriptionPlaceholder] = useState()


    const handleSubmit = (e) => {
        e.preventDefault();


        

        setTimeout(() => {
            window.scrollBy({
                top: 800,
                behavior: "smooth"
            })
        },
            1500)
    }


    useEffect(() => {
        console.log(url)
        axios
            .post("http://localhost:8080/scrape", { url })
            .then((res) => {
                console.log('YO')
                console.log(res)
                if (res) {
                    console.log('HERE')
                    console.log(res.data)
                    // setDescriptionPlaceholder(res.data[0])
                    // setDescription(res.data[0])
                }
                else if (url = "") { setDescriptionPlaceholder(null) }
                else setDescriptionPlaceholder("Sorry we can't parse this page! Try a different link or copy/paste the job description into this box.")
            })
            .catch((err) => {
                console.error(err);
            });
    }, [url])



    

    return (
        <div>
            <div className="formTitle">
                <h1 className="headTitle">Art Stuff</h1>
                <h2 className="headSub"> Let's get rich plz</h2>
                {/* <p className="headP">Please answer as many questions as possible</p> */}
            </div>

            <br />
            <br />

            <form className="inputForm" onSubmit={handleSubmit}>

                
                <div className="questionBox">

                    <img src={paste} className="numberSize" />
                    <div className="questionBoxText">
                        <label className="label">Feel free to paste the link to the job posting, or copy and paste the job description below!</label>
                        <div className="submitLink">
                            <input name="description" id="jobDescription" className="input" placeholder="e.g. https://www.mutualart.com/Artist/Arpita-Singh/B399F960A11B1E51/Artworks " ></input>
                            <button onClick={(e) => {
                                e.preventDefault()
                                // console(document.getElementById("floating_promo").innerHTML)
                                setURL(document.getElementById("jobDescription").value)
                            }
                            } className="button-29">Parse</button>
                        </div>

                    </div>

                </div>

                <br />


                <div className="questionBox">

                    <img src={paste} className="numberSize" />
                    <div className="questionBoxText">

                        <textarea defaultValue={descriptionPlaceholder} onChange={e => setDescription(e.target.value)} name="description" className="textareaInput" rows="10" placeholder="Table will populate here"></textarea>
                    </div>
                </div>


                <br />
                <br />

               

            </form >

            <br />
            <br />

            <div id="Loading">
                {isLoading ? <Loading name={name} /> : null}
            </div>


            {hasCalledAPI ? <CoverForm /> : null}


        </div >
    )
}

export default CoverForm
