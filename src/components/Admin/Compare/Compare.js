import React, { useState, useEffect } from "react";
import "./Compare.css";
import MatchCard from "../MatchUpdate/MatchCard";
import server from "../../../utils/utils";
import { Button } from "@mui/material";

export const removeMatchFromJson = async (matchId)=>{

  try{
    server.pathname = `/admin/removedMatch/${matchId}`;
    const response = await fetch(server);
    
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




const Compare = () => {
  const [oldMatches, setOldMatches] = useState([]);
  const [newMatches, setNewMatches] = useState([]);
  const [error, setError] = useState(null);
  // const [refreshKey, setRefreshKey] = useState(0); // 👈 Key for forcing re-render

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        
        server.pathname = "/admin/compare"
        const response = await fetch(server);
        if (!response.ok) throw new Error("Failed to fetch match data");

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
      await fetch(server);
    } catch (err) {
      console.error("Force refresh failed:", err);
    }
  };

  const handleClick = async () => {
    try {
      server.pathname = "/admin/compareUpdate";
      const response = await fetch(server);
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
  );
};

export default Compare;
