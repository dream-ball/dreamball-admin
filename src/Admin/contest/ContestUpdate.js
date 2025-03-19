import React from "react";
import './contest.css'
import { display_error } from "../../Utils/Util";
import { useEffect,useState } from "react";
import server from "../../utils/utils";
import Header from "../Header/Header";
import Loading from "../../Utils/Loading";

const fetchContest = async ()=>{

  server.pathname = "/admin/fetchContest"

  const options = {
    method: 'GET',
    headers: { 
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json'
    }
  }
  try{

    const response = await fetch(server,options);

    if(response.status === 401 || response.status === 403){
      alert('Not authorized');
    }

    const result = await response.json();

    

    console.log(result);
  }catch(err){
    console.log('Error fetching matches');
  }
}

fetchContest();

const ContestUpdate = () => {

  const [selectedMatches, setSelectedMatches] = useState([]);
  const [loading,setLoading] = useState(true);

  
  useEffect(() => {
    async function fetchSelectedMatches() {

      server.pathname = "/admin/getSelectedMatch";
      const options = {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
        }
      }
      try {

        const response = await fetch(server,options);

        if(response.status === 401 || response.status === 403){
          alert("Not authorized");
        }

        const result = await response.json();
        setSelectedMatches(result);
        setLoading(false);
      } catch (error) {
        display_error("Error fetching match");
      }
    }

    fetchSelectedMatches();
  }, []);

  if(loading){
    return(
      <>
      <Header/>
      <Loading/>
      </>
    )
  }

  return (

    <>
    <Header/>
      <div className="contest-update">

        {
          selectedMatches.map((match)=>
            <h1>{match.match_id}</h1>
          )
        }    

        

      </div>  

    </>
    
  );
};

export default ContestUpdate;
