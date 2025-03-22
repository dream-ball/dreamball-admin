import React, { useEffect, useState } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";

import "./MatchUpdate.css";
import { display_error } from "../../utils/utils";
import {server} from "../../utils/utils";
import Header from "../Header/Header";


const updateMatch = async (matchId) => {

  server.pathname = `/admin/updateSelectedMatch/${matchId}`
      const options = {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({matchId})
    }
    try {
      const response = await fetch(server,options);

      if(response.status === 401 || response.status === 403){
        alert("Not authorized");

      }


      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }

      display_error("Match Updated");
    } catch (error) {
      console.error("Error updating match:", error.message);
      display_error(error.message);

    }
  };


export default function MatchUpdate ({handleLogout}){
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {

        server.pathname ='/admin/upcomingMatches/'
        const options = {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
            'Content-Type': 'application/json'
          }
        };
    
       
    
        console.log(server,options)
        const response = await fetch(server, options);

        if (response.status === 401 || response.status === 403) {
          alert('Not authorized')
          handleLogout();
          return;
        }

        
        const selectedMatch = await response.json();
        // const {token} = selectedMatch;

        // console.log(token)
    
       
        setMatches(selectedMatch.data || []);
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, []);



  if (loading) {
    return <Header/>
  }

  return (
    <>
    <Header/>
    <div className="match-update">
      <h1>Upcoming Cricket Matches</h1>
      <div className="match-cards">
        {matches.length > 0 ? (
          matches.map((match) => (
            <MatchCard
              key={match.match_id}
              match={match}
              page={'update'}
            />
          ))
        ) : (
          <p>No upcoming matches available.</p>
        )}
      </div>
    </div>
    </>
  );
};

export {updateMatch};
