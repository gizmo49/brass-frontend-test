import React, { useState } from "react";
import API from "../../../../lib/api";
import { formatCurrency, getErrorMessage } from "../../../../utils/helper";

const FinalizeTransfer = ({
    transactionDetail: { amount, account_name, transfer_code },
}) => {
    const [processing, sayProcessing] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [transactionMssg, setTransactionMessage] = useState("");

    const [otp, setOTP] = useState("");

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            sayProcessing(true);
            let res = await API.post("/transfer/finalize_transfer", {
                transfer_code,
                otp,
            });
            if (res.status === 200) {
                setTransactionStatus(true);
                setTransactionMessage(res.data.message);
            }
        } catch (error) {
            let errMssg = getErrorMessage(error);
            sayProcessing(false);
            alert(errMssg);
        }
    };

    return (
        <>
            {!transactionStatus ? (
                <div>
                    <i>
                        Enter the six digit OTP you received to complete a
                        transfer of {formatCurrency(amount)} to{" "}
                        <strong>{account_name}</strong>
                    </i>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>OTP</label>
                            <input
                                className="form-control"
                                placeholder="enter six digit pin"
                                onChange={(e) => setOTP(e.target.value)}
                            />
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            disabled={otp === "" || processing}
                        >
                            {!processing ? "Submit" : "Submiting"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="text-center">
                    <h3>{transactionMssg}</h3>
                    Recipient: {account_name}
                    <br />
                    Amount: {formatCurrency(amount)}
                </div>
            )}
        </>
    );
};

export default FinalizeTransfer;
