import React, { useState } from "react";
import "./PanVerificationApproval.css"; // Import the CSS file
import Header from "../Header/Header";

const verificationRequests = [
    {
      id: 1,
      name: "John Doe",
      panNumber: "ABCDE1234F",
      aadharNumber: "1234-5678-9012",
      panImage: "/path/to/pan.jpg",
      aadharImage: "/path/to/aadhar.jpg",
      status: "Pending",
    },
    {
        id: 1,
        name: "John Doe",
        panNumber: "ABCDE1234F",
        aadharNumber: "1234-5678-9012",
        panImage: "/path/to/pan.jpg",
        aadharImage: "/path/to/aadhar.jpg",
        status: "Pending",
      }
  ];


const PanVerificationApproval = () => {
  const [reasons, setReasons] = useState({});
  console.log(reasons)

  const handleReasonChange = (event, requestId) => {
    setReasons((prev) => ({
      ...prev,
      [requestId]: event.target.value,
    }));
  };

  return (
    <>
    <Header/>
    <div className="pan-verification-container">
      {verificationRequests.map((request) => (
        <div key={request.id} className="verification-item">
          <h3>Verification Request</h3>
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>PAN Number:</strong> {request.panNumber}</p>
          <p><strong>Aadhar Number:</strong> {request.aadharNumber}</p>
          
          <div className="image-preview">
            <div>
              <p><strong>PAN Card:</strong></p>
              <img src={request.panImage} alt="PAN Card" className="doc-image" />
            </div>
            <div>
              <p><strong>Aadhar Card:</strong></p>
              <img src={request.aadharImage} alt="Aadhar Card" className="doc-image" />
            </div>
          </div>

          <p><strong>Status:</strong> {request.status}</p>

          {/* Reason Dropdown (Only visible if rejecting) */}
          <p><strong>Reason (if rejecting):</strong></p>
          <select onChange={(e) => handleReasonChange(e, request.id)}>
            <option value="">Select a reason</option>
            <option value="Incorrect Details">Incorrect Details</option>
            <option value="Blurry Images">Blurry Images</option>
            <option value="Mismatched Information">Mismatched Information</option>
          </select>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="wait-btn">Wait Longer</button>
            <button className="approve-btn">Approve</button>
            <button className="decline-btn">Decline</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default PanVerificationApproval;
