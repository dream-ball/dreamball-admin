import { useEffect, useState } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";

import "./SelectedMatches.css";
import server from "../../utils/utils";
import { display_error } from "../../Utils/Util";
import Header from "../Header/Header";


export const extendMatchTime = async (matchId,match_time)=>{    

    server.pathname = `/admin/extendMatch/${matchId}`
    const options = {
      method: 'GET',
      headers: { 
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
      },
        body : JSON.stringify({match_time:match_time}),
    }

    try{
        const response = await fetch(server,options);
        const result =await response.json();
        display_error(result);
    }catch(error){
        console.log(error)
        console.log('extend match error')

    }
}

export async function makeItLive(matchId,date_wise,match_time){
    
  try{
    server.pathname=`/admin/makeLive/${matchId}`;

    const options = {
      method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date_wise,match_time}),
    }

    let response = await fetch(server,options);
    let result = response.json();

    if(!response.ok){
      display_error("Error making Live")
      }

    if(response.status === 200){
      display_error(result);
    }

  }catch(error){
    console.log("Error making live")
  }
  
}

export async function removeMatchFromSelectedMatch(matchId) {
  console.log(matchId);
  try {

    server.pathname = `/admin/removeSelectedMatch/${matchId}`;
    const response = await fetch(server,{ method: "POST" });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const result = await response.json();
    display_error("Match Removed");
  } catch (error) {
    console.error("Error updating match:", error);
  }
}

export default function SelectedMatch()  {
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [loading,setLoading] = useState(true);
  // Fetch selected matches

  
  useEffect(() => {
    async function fetchSelectedMatches() {
      try {

        server.pathname = "/admin/getSelectedMatch";
        const response = await fetch(server);
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
    return<Header/>
  }
  

  return (
    <>
    <Header/>
    <div className="match-cards">
      {selectedMatches.length > 0 ? (
        selectedMatches.map((match) => (
          <MatchCard
            key={match.match_id}
            match={JSON.parse(match.match_data)}
            page={'selected'}
            />
        ))
      ) : (
        <p>No selected matches found.</p>
      )}
    </div>
    </>
  );
};


