import React, { useState } from "react";

const TransactionAmountInput = ({ updateAmount }) => {
    const [amount, setAmount] = useState("");
    const handleAmount = (e) => {
        let { value } = e.target;
        value = value.replace(/[^0-9]/g, "");
        updateAmount(Number(value));
        setAmount(Number(value).toLocaleString());
    };

    return (
        <div className="form-group">
            <label>Amount</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">₦</span>
                </div>
                <input
                    className="form-control"
                    name="amount"
                    onChange={handleAmount}
                    value={amount}
                    autoComplete="off"
                />
            </div>
        </div>
    );
};

export default TransactionAmountInput;
