import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import IntroducerTransaction from "../Modal/IntroducerTransaction";
import IntroducerDepositTransaction from "../Modal/IntroducerDepositTransaction";
import IntroducerWithdrawTransaction from "../Modal/IntroducerWithdrawTransaction";

const IntroducerPayment = ({ IntroducerName, balance, id, duebalance }) => {
  console.log('===> id from IntroducerPayment ',IntroducerName)
  const navigate = useNavigate();
  //   const [introducerName, setIntroducerName] = useState("");
  const [txType, setTxType] = useState("");

  console.log(IntroducerName);

  const handleIntroducerTx = (e, data) => {
    console.log(data);
    console.log(IntroducerName);
    setTxType(data);
  };

  const handelstatement = (e, id) => {
    navigate(`/introducerstatement/${id}`);
  };
  return (
    <div>
      <div class="card-body">
        <div class="card d-flex justify-content-between">
          <div class="card-body ">
            {/* <p className="font-weight-bold d-flex justify-content-center">
              <br />
              <p className="font-weight-bold">
                Payment Done Lifetime
                <br />
                <p className="text-success text-center">Balance:{balance}</p>
                <p className="text-success text-center">
                  Current Due:{duebalance}
                </p>
              </p>
            </p> */}
            <div className=" d-flex justify-content-center gap-1">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                data-toggle="modal"
                data-target="#withdrawModal"
                onClick={(e) => {
                  handleIntroducerTx(e, "Withdraw");
                }}
              >
                <FontAwesomeIcon icon={faMinus} className="add-icon" />
              </button>
              <button
                type="button"
                class="btn btn-success btn-sm"
                data-toggle="modal"
                data-target="#depositModal"
                onClick={(e) => {
                  handleIntroducerTx(e, "Deposit");
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="add-icon" />
              </button>
              <button
                type="button"
                class="btn btn-info btn-sm"
                onClick={(e) => {
                  handelstatement(e, id);
                }}
              >
                <FontAwesomeIcon icon={faFileAlt} className="add-icon" />
              </button>
              {/* <button type="button" class="btn btn-warning btn-sm ">
                <FontAwesomeIcon
                  icon={faEdit}
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                />
              </button> */}

              {/* <button type="button" class="btn btn-danger  btn-sm">
                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <IntroducerTransaction TxType={txType} IntroducerName={IntroducerName} /> */}
      {txType === "Deposit" && (
        <IntroducerDepositTransaction IntroducerName={IntroducerName} />
      )}
      {txType === "Withdraw" && (
        <IntroducerWithdrawTransaction IntroducerName={IntroducerName} />
      )}
    </div>
  );
};

export default IntroducerPayment;
