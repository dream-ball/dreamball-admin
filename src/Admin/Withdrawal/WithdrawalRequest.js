import React, { useState } from "react";
import "./withdraw.css";
import Header from "../Header/Header";

const WithdrawalRequest = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      accountNumber: "123456789",
      name: "John Doe",
      amount: 500,
      reason: "Emergency",
    },
    {
      id: 2,
      accountNumber: "987654321",
      name: "Jane Smith",
      amount: 300,
      reason: "Medical Expenses",
    },
    {
      id: 3,
      accountNumber: "987654321",
      name: "Jane Smith",
      amount: 300,
      reason: "Medical Expenses",
    },
  
   
  ]);

  const handleApprove = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    alert("Request Approved");
  };

  const handleReject = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    alert("Request Rejected");
  };

  const [reasons, setReasons] = useState({});

  const handleReasonChange = (event, requestId) => {
    setReasons((prev) => ({
      ...prev,
      [requestId]: event.target.value,
    }));
  };

  return (
    <>
      <Header />
      <h2>Withdrawal Requests</h2>
      <div className="withdrawal-container">
        {requests.length > 0 ? (
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="request-item">
                <p>
                  <strong>Account Number:</strong> {request.accountNumber}
                </p>
                <p>
                  <strong>Name:</strong> {request.name}
                </p>
                <p>
                  <strong>Amount:</strong> ${request.amount}
                </p>
                <p>
                  <strong>Reason:</strong>
                  <select onChange={(e) => handleReasonChange(e, request.id)}>
                    <option value="">Select a reason</option>
                    <option value="Try Again">
                      Insufficient Balance
                    </option>
                    <option value="Fraudulent Activity">
                      Fraudulent Activity
                    </option>
                    <option value="Invalid Request">Invalid Request</option>
                  </select>
                </p>

                <button
                  className="approve"
                  onClick={() => handleApprove(request.id)}
                >
                  Approve
                </button>
                <button
                  className="reject"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending requests</p>
        )}
      </div>
    </>
  );
};

export default WithdrawalRequest;
