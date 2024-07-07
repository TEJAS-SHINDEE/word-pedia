import { useState, useEffect } from "react";
import {useRef} from 'react';
import "./App.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const App = () => {
  let url = 'https://api.pexels.com/v1/search?query=';
  let api = 'Kfue9JjBG1UO3DTTlO15DiGm6AFjtA31T4nhbCXUlZnouL3O5MPOVI65';
  let ninjaapi='l+Ke4df0WX/tRAnjTkoPPw==z81L5UnuvSSEmJl4';
  let dictUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  let antsynUrl='https://api.api-ninjas.com/v1/thesaurus?word=';
  let rhymeurl="https://api.api-ninjas.com/v1/rhyme?word=";
  const inputRef = useRef(null);
  
  const [myData, setMyData] = useState([]);
  const[myDictData, setMyDictData] = useState([]);
  const [mySynData,setMySynData]=useState([]);
  const [myRhymData,setMyRhymData]=useState([]);
  const [isError, setIsError] = useState("");



  function handleClick() {
    setIsError("");
    setMyDictData(null);
    getApiData(`${url}`+inputRef.current.value);

    getDictData(`${dictUrl}`+inputRef.current.value);

    getSaData(`${antsynUrl}`+inputRef.current.value);

    getRhymData(`${rhymeurl}`+inputRef.current.value)

    

  }

  const  getDictData = async(url2) =>{
    try {
      const res2 = await axios.get(url2);
      setMyDictData(res2.data[0].meanings[0].definitions);
      console.log(res2.data[0].meanings[0].definitions);

    } catch (error) {
      setIsError(error.message)

    }
  }

  const  getSaData = async(url3) =>{
    try {
      const res3 = await axios.get(url3,  {headers: { 'X-Api-Key': ninjaapi}})
      
      setMySynData(res3.data);
    } catch (error) {
      setIsError(error.message)
    }
  }

  const getApiData = async(urlo) =>{
    try {
      const res=  await axios.get(
        urlo,
        {headers: {
            "Authorization" : api
          }
        }
      );
      setMyData(res.data.photos)
    } catch (error) {
      setIsError(error.message)
    }

  }

  const  getRhymData = async(url4) =>{
    try {
      const res4 = await axios.get(
        url4,
        {
          headers:{
            "X-Api-Key": ninjaapi
          }
        }
        );
      setMyRhymData(res4.data);
      console.log(res4.data);
      // for(let synonym of mySynData)
      // {
      //   console.log(synonym);
      // }

    } catch (error) {
      setIsError(error.message)
    }
  }

  return (
    <>

      <div className="body">

        {/* <input
        ref={inputRef}
        type="text"
        id="message"
        name="message"
      /> */}
      
      {/* <button onClick={handleClick}>Find</button> */}
      {/* <div class="input-group">
        <input ref={inputRef}
          type="text" id="message"
          name="message" 
          class="form-control rounded"
          placeholder="Search" aria-label="Search"
          aria-describedby="search-addon" />

        <button type="button" class="btn btn-dark" onClick={handleClick}>Find</button>
      </div> */}
 
        <h1 className="title">Welcome To Word-Pedia</h1>
      <div className="intro-div">

      </div>
          
      
    <div class="search-text">
      <h2 className="search-text-heading">SEARCH FOR YOUR KEYWORD FOR ANSWERS</h2>
    </div>
        <div class="input-group">
          
          <input ref={inputRef}
            type="text" id="message"
            name="message" 
            class="form-control"
            placeholder="Search for a word" aria-label="Search"
            aria-describedby="search-addon" />
          
          <button type="button" class="btn btn-outline-success" onClick={handleClick}><i class="fa-solid fa-2x fa-magnifying-glass"></i></button>
      </div>
      
      {isError !== "" && <h2>No result found </h2>}
    
      <Row>
        <Col xs={12} md={6} lg={6}>
        <div>
        {
        myDictData!= null && myDictData.slice(0,4).map((value) => {
          const { id ,definition,example} = value;
          return (
            <div key={id} className="def">
                {/* <h2>{width}</h2>
                <p>{height}</p>
                <p>{url}</p>
                <p>{src.medium}</p> */}
                <p className="def-definition"><b>Definition:</b> {definition || "No Definition found"}</p>
                <b>Example:</b> <p class="def-example">{example|| "No Example found"}</p>
                <br />
                <br />
            </div>
          );
          })
      }
      </div>
        </Col>

        <Col xs={12} md={6} lg={6}>
        <div>
            {

                  myData.slice(0,2).map((post) => {
                  const { id ,width, height, url ,src} = post;
                  return (
                    <div key={id} className="img-div">
                        {/* <h2>{width}</h2>
                        <p>{height}</p>
                        <p>{url}</p>
                        <p>{src.medium}</p> */}
                        <img src={src.landscape} className="searched-img" />
                    </div>
                  );
                  })
               
          }
          </div></Col>
          
      </Row>

      <div className="antonym-div">
        <h2 className="antonym-text">
        Antonym are the words that have the exact opposite meaning to another
        </h2>
      </div>
      <div class="antonym">
      { 
          mySynData.antonyms != "" && mySynData.antonyms?.length > 0 && mySynData.antonyms?.[0] != "" &&
          <h2 className="result-text">Antonyms :</h2> }
          {
            mySynData.antonyms != "" && mySynData.antonyms?.length > 0 && mySynData.antonyms?.[0] != "" && mySynData.antonyms?.slice(0,15).map((value)=>{
              return(
                <div className="syns">
                  {value}

                </div>
              )

            })
          }
      </div>

          <br /><br />

      <div className="synonym-div">
        <h2 className="synonym-text">
        A synonym is a word, morpheme, or phrase that means exactly or nearly the same as another word
        </h2>
      </div>
      <div className="synonym">

        {
         
         mySynData.synonyms != "" && mySynData.synonyms?.length > 0 && mySynData.synonyms?.[0] != "" &&
          <h1 className="special-heading" >Synonyms :</h1>
        }
        
          {
            mySynData.synonyms != "" && mySynData.synonyms?.length > 0 && mySynData.synonyms?.[0] != "" && mySynData.synonyms?.slice(0,13).map((value)=>{
              return(
                <div class="syns-2">
                  {value}

                </div>
              )

            })
          }
          

      </div>

          <br /><br />
      <div className="rhyme-div">
        <h2 className="rhyme-text">
            Rhymes are words That have same ending sound
        </h2>
      </div>

      <div class="rhyme">
      { 
          myRhymData != "" && myRhymData?.length > 0 && myRhymData?.[0] != "" &&
          <h2 className="result-text">Rhymes :</h2> }
          {
            myRhymData != "" && myRhymData?.length > 0 && myRhymData?.[0] != "" && myRhymData?.slice(0,15).map((value)=>{
              return(
                <div className="syns">
                  {value}

                </div>
              )

            })
          }
      </div>

          <br /><br />

      <footer>
          
          <i href="" class="fa-brands fa-facebook social-icon fa-2x"></i>
          <i href="" class="fa-brands fa-instagram social-icon fa-2x"></i>
          <i href="" class="fa-brands fa-twitter social-icon fa-2x"></i>
          <a href="mailto:tejasshinde8022@gmail.com"><i class="fa-solid fa-envelope social-icon fa-2x"></i></a>

          <p >© Word Pedia 2024</p>

      </footer>
      
        
      </div>
    
    </>
  );
};

export default App;
