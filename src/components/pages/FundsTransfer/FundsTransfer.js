import React, { useState } from "react";
import FinalizeTransfer from "./FinalizeTransfer/FinalizeTransfer";
import InitiateTransfer from "./InitiateTransfer/InitiateTransfer";

const FundsTransfer = () => {
    const [finalStage, setFinalStage] = useState(false);
    const [transactionDetail, acceptTransactionParams] = useState({});

    const goToFinalStage = (params) => {
        setFinalStage(true);
        acceptTransactionParams(params);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="mt-5">
                    {!finalStage ? (
                        <InitiateTransfer goToFinalStage={goToFinalStage} />
                    ) : (
                        <FinalizeTransfer
                            transactionDetail={transactionDetail}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FundsTransfer;
