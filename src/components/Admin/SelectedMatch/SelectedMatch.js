import { useEffect, useState } from "react";
import MatchCard from "../MatchUpdate/MatchCard";
import "./SelectedMatches.css";
import server from "../../../utils/utils";
import { display_error } from "../../Utils/Util";


export const extendMatchTime = async (matchId,match_time)=>{    

    server.pathname = `/admin/extendMatch/${matchId}`
    const options = {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({match_time:match_time}),
    }

    try{
        const response = await fetch(server,options);
        const result =await response.json();

        console.log(result)


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

    if(!response.ok){
      alert("Error making live :(")
    }

    if(!response){
      alert('match is live :)')
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
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);

  // Fetch selected matches
  useEffect(() => {
    async function fetchSelectedMatches() {
      try {

        server.pathname = "/admin/getSelectedMatch";
        const response = await fetch(server);
        const result = await response.json();
        setSelectedMatches(result);
      } catch (error) {
        console.error("Error fetching selected matches:", error);
      }
    }

    fetchSelectedMatches();
  }, []);

  

  // Fetch upcoming matches
  useEffect(() => {
    async function fetchUpcomingMatches() {
      try {

        server.pathname = "/admin/upcomingMatches";
        const response = await fetch(server);
        const result = await response.json();
        setUpcomingMatches(result);
      } catch (error) {
        console.error("Error fetching upcoming matches:", error);
      }
    }

    fetchUpcomingMatches();
  }, []);

  // Filter upcoming matches that exist in selected matches

  useEffect(() => {
    if (upcomingMatches.data && selectedMatches.length) {
      let match_array = [];
      selectedMatches.map((match) => {
        match_array.push(match.match_id);
        return 0;
      });
      let data = upcomingMatches.data;
      let m_data = data.filter((match) => match_array.includes(match.match_id));

      setFilteredMatches(m_data);
    }
  }, [selectedMatches, upcomingMatches]);

  return (
    <div className="match-cards">
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <MatchCard
            key={match.match_id}
            match={match}
            page={'selected'}
            />
        ))
      ) : (
        <p>No selected matches found.</p>
      )}
    </div>
  );
};


