import React, { useState } from "react";
import API from "../../../../lib/api";
import TransactionAmountInput from "../../../../utils/formElements/TransacAmountInput/TransactionAmountInput";
import { getErrorMessage } from "../../../../utils/helper";
import AcctNumberInputEnquiry from "../../../common/AcctNumberInputEnquiry/AcctNumberInputEnquiry";
import BankSelect from "../../../common/BankSelect/BankSelect";

const InitiateTransfer = ({ goToFinalStage }) => {
    const [requestPayLoad, setPayLoad] = useState({
        bankInfo: {},
        amount: "",
    });
    const [processing, sayProcessing] = useState(false);
    const [acctEnquiryRes, setAcctEnquiryRes] = useState(undefined);
    const [beneCreationAllowed, allowBeneficiaryCreation] = useState(true);
    const [fundsTransferAllowed, allowFundsTransfer] = useState(false);
    const [creatingBene, setCreatingBeneficiaryStatus] = useState(false);
    const [currentRecipient, setCurrentRecipient] = useState(undefined);

    const createTransferBeneficiary = async () => {
        try {
            setCreatingBeneficiaryStatus(true);
            let { bankInfo } = requestPayLoad;
            let reqPayload = {
                type: bankInfo.type,
                bank_code: bankInfo.code,
                name: acctEnquiryRes.account_name,
                account_number: acctEnquiryRes.account_number,
            };
            const res = await API.post("/transferrecipient", reqPayload);
            if (res.status) {
                allowBeneficiaryCreation(false);
                allowFundsTransfer(true);
                setCurrentRecipient(res.data.data);
            }
        } catch (err) {
            let errMssg = getErrorMessage(err);
            alert(errMssg);
            setCreatingBeneficiaryStatus(false);
        }
    };

    const handleFormSubmission = async (e) => {
        try {
            e.preventDefault();
            sayProcessing(true);
            let reqPayload = {
                source: "balance",
                recipient: currentRecipient.recipient_code,
                amount: requestPayLoad.amount * 100, //kobo
            };
            const res = await API.post("/transfer", reqPayload);
            if (res.status) {
                let transactionDetails = {
                    amount: requestPayLoad.amount,
                    transfer_code: res?.data?.data?.transfer_code,
                    account_name: acctEnquiryRes.account_name,
                };
                goToFinalStage(transactionDetails);
            }
        } catch (error) {
            let errMssg = getErrorMessage(error);
            sayProcessing(false);
            alert(errMssg);
        }
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <BankSelect
                selectedBank={requestPayLoad.bankInfo}
                acceptBankCode={(bank) =>
                    setPayLoad((prevState) => ({
                        ...prevState,
                        bankInfo: bank,
                    }))
                }
            />

            <AcctNumberInputEnquiry
                bankInfo={requestPayLoad.bankInfo}
                setAcctEnquiryRes={(res) => setAcctEnquiryRes(res)}
            />

            {beneCreationAllowed && (
                <button
                    className="btn btn-primary w-100 mt-2 p-2"
                    type={"button"}
                    onClick={createTransferBeneficiary}
                >
                    {creatingBene ? "Processing..." : "Proceed"}
                </button>
            )}

            {fundsTransferAllowed && (
                <>
                    <TransactionAmountInput
                        label="Amount"
                        updateAmount={(amount) =>
                            setPayLoad((prevState) => ({
                                ...prevState,
                                amount,
                            }))
                        }
                    />
                    <div className="my-2">
                        <i>
                            Please include an amount in the range of NGN 100 to
                            NGN 10,000,000{" "}
                        </i>
                    </div>
                    <button
                        className="btn btn-danger w-100 mt-2 p-2"
                        type="submit"
                        disabled={
                            requestPayLoad.amount < 100 ||
                            requestPayLoad.amount > 10000000 ||
                            processing
                        }
                    >
                        {processing ? "Processing" : "Send Money"}
                    </button>
                </>
            )}
        </form>
    );
};

export default InitiateTransfer;
