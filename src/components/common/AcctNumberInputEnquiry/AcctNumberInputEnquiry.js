import React, { Component } from "react";
import API from "../../../lib/api";
import { getErrorMessage } from "../../../utils/helper";

class AcctNumberInputEnquiry extends Component {
    state = {
        fetching: false,
        recipientAccountNumber: "",
    };

    // static getDerivedStateFromProps(nextProps, prevState) {
    // check if bankCode changes here
    //     if (prevState.defaultValue !== nextProps.defaultValue) {
    //         return { recipientAccountNumber: nextProps.defaultValue };
    //     }
    //     return null;
    // }

    checkTrue = (e) => {
        const { value: recipientAccountNumber } = e.target;
        if (recipientAccountNumber.length === 10) {
            this.performNameEnquiry(recipientAccountNumber);
        }
    };

    handleNumberChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/[^0-9]/g, "");
        this.setState({
            [name]: value,
            serverError: false,
        });
    };

    performNameEnquiry = async (recipientAccountNumber) => {
        try {
            if (recipientAccountNumber.length === 10) {
                this.setState({
                    fetching: true,
                });
                const {
                    bankInfo: { code },
                } = this.props;
                const res = await API.get("/bank/resolve", {
                    params: {
                        account_number: recipientAccountNumber,
                        bank_code: code,
                    },
                });
                if (res.status) {
                    this.props.setAcctEnquiryRes(res.data.data);
                    this.setState({
                        fetching: false,
                        serverResponse: res?.data?.data?.account_name,
                        serverError: false,
                    });
                }
            }
        } catch (err) {
            this.setState({
                serverError: getErrorMessage(err),
                fetching: false,
            });
        }
    };

    render = () => {
        const {
            fetching,
            serverResponse,
            serverError,
            recipientAccountNumber,
        } = this.state;
        const { error } = this.props;

        return (
            <div className="form-group">
                <label>Recipient</label>
                <input
                    name="recipientAccountNumber"
                    type="text"
                    className={"form-control " + (error ? "has-error" : "")}
                    maxLength={10}
                    value={recipientAccountNumber}
                    onChange={this.handleNumberChange}
                    onKeyUp={this.checkTrue}
                    // onKeyDown={handleAcctNumberDel}
                    disabled={fetching && recipientAccountNumber.length === 10}
                    onBlur={this.checkTrue}
                    placeholder="Type account number"
                    autoComplete="off"
                />
                <div className="mt-2">
                    {fetching && <span>Resolving...</span>}
                    {serverResponse && <span>{serverResponse}</span>}
                    {serverError && (
                        <span className="error-msg">{serverError}</span>
                    )}
                </div>
            </div>
        );
    };
}

export default AcctNumberInputEnquiry;
