import React from "react";
import './contest.css'
import ContestCard from "./ContestCard";
import { display_error } from "../../Utils/Util";
import { useEffect,useState } from "react";
import server from "../../../utils/utils";

const fetchContest = async ()=>{


  try{

    const response = await fetch('localhost:8081/admin/fetchContest',{method : 'GET'});
    const result = await response.json();

    console.log(result);
  }catch(err){
    console.log('Error fetching matches');
  }
}

fetchContest();

const ContestUpdate = () => {

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


,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,.,.,..,.,.,..,..,.,.,,,,,,545` 44`,,,, 

  return (

    <>
      <div className="contest-update">

        {
          selectedMatches.map((match)=>{
            match.match_id
          })
        }    

      </div>  
    </>
    
  );
};

export default ContestUpdate;
