import React from "react";
import './contest.css'
import ContestCard from "./ContestCard";

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


  return (

    <>
      <div className="contest-update">

        <ContestCard/>
        <ContestCard/>
        <ContestCard/>

      </div>  
    </>
    
  );
};

export default ContestUpdate;
