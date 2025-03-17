import React from "react";
import "./MatchCard.css";
import { Button } from "@mui/material";


import {  abortMatch,cancelMatch, initiateRefund } from "../../Admin/LiveMatches/LiveMatches";
import { updateMatch } from "../../Admin/MatchUpdate/MatchUpdate";
import { removeMatchFromJson } from "../../Admin/Compare/Compare";
import { removeMatchFromSelectedMatch } from "../../Admin/SelectedMatch/SelectedMatch";
import { makeItLive,extendMatchTime } from "../../Admin/SelectedMatch/SelectedMatch";
import UploadBallByBall from "../../Admin/BallUpdate/UploadBallByBall";

const MatchCard = ({ match,page}) => {

  

  const renderButton = ()=>{

    switch(page){
      case "update":
        return  <div className="buttons">
                  <Button onClick={()=>updateMatch(match.match_id)} variant="contained" color="secondary" size="small">update</Button>
                </div>
      case "selected":
        return  <div className="buttons">
                  <Button onClick={()=>{extendMatchTime(match.match_id,match.match_time)}} variant="contained" color="primary"  size="small">Extend</Button>
                  <Button onClick={()=>removeMatchFromSelectedMatch(match.match_id)} variant="contained" color="primary" size="small">Remove</Button>
                  <Button onClick={()=>makeItLive(match.match_id,match.date_wise,match.match_time)} variant="contained" color="primary" size="small">To Live</Button>
                </div>
      case "compare":
        return  <div className="buttons">
                  <Button onClick={()=>{removeMatchFromJson()}} variant="contained" color="primary" size="small">Remove</Button>
                </div>
      case "live":
        return  <div className="buttons">
                  <Button onClick={()=>{abortMatch(match.match_id,match.match_time,match.date_wise,match)}} variant="contained" color="primary" size="small">Revert</Button>
                  <Button onClick={()=>{cancelMatch(match.match_id,match.match_time)}} variant="contained" color="primary" size="small">Cancel</Button>
                  <Button onClick={()=>{initiateRefund()}} variant="contained" color="primary" size="small">Refund</Button>
                </div>

      case "ball-update":
        return<div className="buttons">
          <Button onClick={()=>{}} variant="contained" color="primary" size="small">update balls</Button>
        </div>
      case 'ball-form':
        return  <UploadBallByBall/>
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
