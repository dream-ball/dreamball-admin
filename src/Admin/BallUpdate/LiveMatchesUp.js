import React, { useEffect, useState } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";
import server from "../../utils/utils";
import Header from "../Header/Header";
import Loading from "../../Utils/Loading";

export default function LiveMatchesUp({handleLogout}) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchLiveMatches() {

            server.pathname = '/admin/getLiveMatches'
            const options = {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                    'Content-Type': 'application/json'
                }
            }

            try {
                
                const response = await fetch(server,options);
                if (!response.ok) {
                    throw new Error("Failed to fetch live matches");
                }

                const data = await response.json();

                if(!data.token){
                    alert("You are not authorized");
                    handleLogout();
                }
                setMatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLiveMatches();
    }, []);

    if (loading){
        return(
            <>
                <Header/>
                <Loading/>
            </>
        )
    }
    
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header/>
            <h1>Live Matches</h1>
            <ul>
                {matches.map((match) => (
                    <MatchCard key={match.match_id} match={JSON.parse(match.match_data)} page={'ball-update'} onPage/>
                ))}
            </ul>
        </>
    );
}
