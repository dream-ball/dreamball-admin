import React, { useState, useEffect } from "react";
import "./Compare.css";
import MatchCard from "../../Components/MatchCard/MatchCard";
import server from "../../utils/utils";
import { Button } from "@mui/material";
import Header from "../Header/Header";

export const removeMatchFromJson = async (matchId)=>{

  server.pathname = `/admin/removedMatch/${matchId}`;
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
      alert('Not authorized')
    }
    
    if(!response.ok){
      console.log("Error removing match , status code: ", response.status);
    }

    if(response.ok){
      alert("Match removed");
    }

  }catch(error){
    console.log("error removing match");
  }
}




export default function Compare({handleLogout}) {
  const [oldMatches, setOldMatches] = useState([]);
  const [newMatches, setNewMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        
        server.pathname = "/admin/compare"
        const options = {
          method: 'GET',
          headers: { 
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
              'Content-Type': 'application/json'
          }
      }
        
        const response = await fetch(server,options);

        if(response.status === 401 || response.status === 403){
          alert("Not authorized");
        }
        
        if (!response.ok){
          throw new Error("Failed to fetch match data");
        }


        if(response.status === 401 || response.status === 403){
          alert("Not authorized")
        }


        const { oldMatchData, newMatchData } = await response.json();
        
        console.log(newMatchData);

        setOldMatches(oldMatchData.data);
        setNewMatches(newMatchData.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMatches();
  }, []); 

  const forceRefresh = async () => {
    try {

      server.pathname = "/admin/forceRefresh"
      const options = {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
        }
    }

      const response = await fetch(server,options);

      if(response.status === 401 || response.status === 403){
        alert('Not authorized');
      }


    } catch (err) {
      console.error("Force refresh failed:", err);
    }
  };

  const handleClick = async () => {
    try {
      server.pathname = "/admin/compareUpdate";
      const options = {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
        }
    }
      const response = await fetch(server,options);
      if (!response.ok){
        alert("Failed to fetch");
      }
      
      if(response.ok){
        alert("Match data fetched");
      } 
      
    }catch(error){
      console.log(error);
    }
  }


  return (
    <>
    <Header/>
    <div className="compare-container">
      <h1>Match Comparison</h1>
      {error && <p className="error">{error}</p>}

      <Button onClick={handleClick} variant="contained" color='primary' size='small'>update file</Button>
      <Button onClick={forceRefresh} variant='contained' color='primary' size='small'>Force refresh</Button>

      <div className="matches-wrapper">
        <div className="matches-column">
          <h2>Old Matches</h2>
          {oldMatches.length > 0 ? (
            oldMatches.map((match) => (
              <MatchCard  key={match.match_id} match={match} page={'compare'}/>
            ))
          ) : (
            <p>No old matches available.</p>
          )}
        </div>

        <div className="matches-column">
          <h2>New Matches</h2>
          {newMatches.length > 0 ? (
            newMatches.map((match) => (
              <MatchCard key={match.match_id} match={match} />
            ))
          ) : (
            <p>No new matches available.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

