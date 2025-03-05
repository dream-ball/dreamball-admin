import MatchCard from "../MatchUpdate/MatchCard";
import { useEffect, useState } from "react";
import server from "../../../utils/utils";
import './LiveMatches.css'


// const extendMatchTime = async (matchId,match_time)=>{    

//     server.pathname = `/admin/extendMatch/${matchId}`
//     const options = {
//         method : 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body : JSON.stringify({match_time:match_time}),
//     }

//     try{
//         const response = await fetch(server,options);
//         const result =await response.json();

//         console.log(result)


//     }catch(error){
//         console.log(error)
//         console.log('extend match error')

//     }
// }

const abortMatch = async (matchId,match_time,date_wise,match)=>{

    const match_data = JSON.stringify(match);
    

    server.pathname = `/admin/abortLiveMatch/${matchId}`;
    const options = {
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({match_time : match_time,date_wise : date_wise,match_data : match_data}) 
    }

    try{
        const response = await fetch(server,options);
        const result = await response.json();


        if(!response.ok){
            console.log("Error while fetching ! ")
        }

        if(response.ok){
            console.log(result);
            
        }

    }catch(error){
        
    }
}

const cancelMatch = async ()=>{
    
    server.pathname = '/admin/cancelMatch'

    try{
        const response = await fetch(server);

        alert(response);

    }catch(error){
        console.log(' cancel match error')

    }

}

const initiateRefund = async ()=>{
   

    server.pathname = '/admin/initiateRefund'

    try{
        const response = await fetch(server);

        alert(response);

    }catch(error){
        console.log('initiate refund error')
    }
}


export default function Live() {

    const [liveMatch,setLiveMatch] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect( ()=>{
        async function fetchdata() {

            server.pathname = "/admin/getLiveMatches"

            const response = await fetch(server);
            
            if(!response.ok){
                alert("connection error")
            }

            const data = await response.json();

            if(response.ok){
                setLiveMatch(data);
                setLoading(false);
            }
        }
        
        fetchdata();
    },[]);

    
    if(loading){
        return <h1>Loading...</h1>
    }

   
    return(
        <div className="live-match-wrapper">
            <h1>Live Matches</h1>

            <div className="live-matches-container">
            
                <div className="live-matches">
                    {liveMatch.length >= 0 ? (
                    liveMatch.map((match) => (
                    <MatchCard key={match.match_id} match={JSON.parse(match.match_data)} page={'live'}/>
                    ))
                    ) : (
                    <p>No old matches available.</p>
                    )} 
                </div>

            </div>
        </div>
    );
}


export  {abortMatch,cancelMatch,initiateRefund}