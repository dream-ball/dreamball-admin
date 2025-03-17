import "./contestCard.css"
import server from "../../utils/utils";
import { display_error } from "../../Utils/Util";
import { useEffect,useState } from "react";


export default function ContestCard() {
    
    const [selectedMatches, setSelectedMatches] = useState([]);
    const [loading,setLoading] = useState(true);
    let match_Data;

    useEffect(()=>{
        
        async function getSelectedMatch()  {

            try {

                server.pathname = "/admin/getSelectedMatch";
                const response = await fetch(server);
                const result = await response.json();
                setSelectedMatches(result)
                
                setLoading(false);
            } catch (error) {
                display_error("Error fetching match");
            }
        }

        getSelectedMatch()

    },[])

    console.log(match_Data);
    console.log(selectedMatches);
    

    if(loading){
        <h1>Loading...</h1>
    }

    return(
        <div className="contest-container">
            
            <>
            <div className="match-type-time">
                <p>{selectedMatches.series}</p>
                <p>{selectedMatches.match_time}</p>
            </div>

            <div className="match-verses-board">

                <div className="team-1 team-img">
                    <img src={selectedMatches.team_a_img} alt="team-image"/>
                    <p>{selectedMatches.team_a}</p>
                </div>

                <div className="match-timing">
                    <p>match starts in</p>
                    <p>time...</p>
                </div>

                <div className="team-2 team-img">
                    <img src={selectedMatches.team_b_img} alt="team-image"/>
                    <p>{selectedMatches.team_b}</p>
                </div>
            </div>

            <div className="mega">
                <p>mega+</p>
            </div>
            </>
            <div className="contests">

            </div>
        </div>
    )
    
}