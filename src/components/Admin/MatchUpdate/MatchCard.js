import React from "react";
import "./MatchCard.css";

import {  abortMatch,cancelMatch, initiateRefund } from "../LiveMatches/LiveMatches";
import { updateMatch } from "./MatchUpdate";
import { removeMatchFromJson } from "../Compare/Compare";
import { removeMatchFromSelectedMatch } from "../SelectedMatch/SelectedMatch";
import { makeItLive,extendMatchTime } from "../SelectedMatch/SelectedMatch";

const MatchCard = ({ match,page}) => {

  const renderButton = ()=>{

    switch(page){
      case "update":
        return  <div className="buttons">
                  <button onClick={()=>updateMatch(match.match_id)}>Update</button>
                </div>
      case "selected":
        return  <div className="buttons">
                  <button onClick={()=>{extendMatchTime(match.match_id,match.match_time)}}>Extend</button>
                  <button onClick={()=>removeMatchFromSelectedMatch(match.match_id)}>Remove</button>
                  <button onClick={()=>makeItLive(match.match_id,match.date_wise,match.match_time)}>To Live</button>
                </div>
      case "compare":
        return  <div className="buttons">
                  <button onClick={()=>{removeMatchFromJson()}}>Remove</button>
                </div>
      case "live":
        return  <div className="buttons">
                  <button onClick={()=>{abortMatch(match.match_id,match.match_time,match.date_wise)}}>Abort</button>
                  <button onClick={()=>{cancelMatch(match.match_id,match.match_time)}}>Cancel</button>
                  <button onClick={()=>{initiateRefund()}}>Refund</button>
                </div>
      default:
        
    }
  }

  
  
 return (
    <div className = {"match-card"}>

        {renderButton()}

      <div className="team-images">
        <img src={match.team_a_img} alt={match.team_a} className="team-logo" />
        <img src={match.team_b_img} alt={match.team_b} className="team-logo" />
      </div>

      <h3>{match.team_a} vs {match.team_b}</h3>
      <p><strong>Match ID:</strong> {match.match_id}</p>
      <p><strong>Match Status:</strong> {match.match_status}</p>
      <p><strong>Match Date:</strong> {match.date_wise}</p>
      <p><strong>Match Time:</strong> {match.match_time}</p>
      <p><strong>Match Type:</strong> {match.match_type}</p>
      <p><strong>Series:</strong> {match.series}</p>
      <p><strong>Teams:</strong> {match.team_a_short} vs {match.team_b_short}</p>
    </div>
  );
};

export default MatchCard;
