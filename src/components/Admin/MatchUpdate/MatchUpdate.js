import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import "./MatchUpdate.css";
import { display_error } from "../../Utils/Util";
import server from "../../../utils/utils";


const updateMatch = async (matchId) => {
    try {

      server.pathname = `/admin/updateSelectedMatch/${matchId}`
      const response = await fetch(server,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matchId }),
        }
      );
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


export default function MatchUpdate (){
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        server.pathname = "/admin/upcomingMatches";

        const response = await fetch(server);

        const matchData = await response.json();
        setMatches(matchData.data || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
};

export {updateMatch};
