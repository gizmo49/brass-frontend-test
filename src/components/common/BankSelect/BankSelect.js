import React from "react";
import AsyncSelect from "react-select/async";
import API from "../../../lib/api";

const BankSelect = () => {
    
    async function getBankList() {
        try {
            const res = await API.get("/bank");
            if (res.status === 200) {
                return res.data.data;
            }
        } catch (err) {
            return [];
        }
    }

    return (
        <div className="form-group">
            <label>Choose a bank</label>
            <AsyncSelect
                name="bankCode"
                classNamePrefix="react-select"
                isSearchable={true}
                loadOptions={getBankList}
                getOptionLabel={(option) => option.name}
                placeholder="select bank"
                cacheOptions
                defaultOptions
            />
        </div>
    );
};

export default BankSelect;
