import React, { useEffect, useState } from "react";
import MatchCard from "../../Components/MatchCard/MatchCard";
import {server} from "../../utils/utils";
import Header from "../Header/Header";
import Loading from "../../utils/Loading";


export default function LiveMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchLiveMatches() {
            try {
                
                server.pathname = '/admin/live/matches'
                const options = {
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                        'Content-Type': 'application/json'
                    }
                };
                
                const response = await fetch(server,options);


                if (!response.ok) {
                    throw new Error("Failed to fetch live matches");
                }

                if(response === 401 && response === 403){
                    alert('Not authorized')
                }

                const data = await response.json();
                setMatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLiveMatches();
    }, []);

    if (loading) return <Loading/>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Header/>
            <h1>Live Matches</h1>
            <ul>
                {matches.map((match) => (
                    <MatchCard key={match.match_id} match={JSON.parse(match.match_data)} path={`/admin/live/match/${match.match_id}`} page={'ball-form'} />
                ))}
            </ul>
        </>
    );
}