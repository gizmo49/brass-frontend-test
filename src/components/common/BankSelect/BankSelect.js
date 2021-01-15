import React, { useEffect, useState } from "react";
import Select from "react-select";
import API from "../../../lib/api";

const BankSelect = ({ acceptBankCode, selectedBank }) => {
    const [banksList, setBankList] = useState([]);

    async function getBankList() {
        try {
            const res = await API.get("/bank");
            if (res.status === 200) {
                let bankingData = [];
                res.data.data.map((item) =>
                    bankingData.push({
                        label: item,
                        value: item,
                        ...item,
                    })
                );
                return bankingData;
            }
        } catch (err) {
            return [];
        }
    }

    useEffect(() => {
        let mounted = true;
        getBankList().then((items) => {
            if (mounted) {
                setBankList(items);
            }
        });
        return () => (mounted = false);
    }, []);

    return (
        <div className="form-group">
            <label>Choose a bank</label>
            <Select
                name="bankCode"
                classNamePrefix="react-select"
                value={selectedBank}
                onChange={(value) => acceptBankCode(value)}
                isSearchable={true}
                options={banksList}
                loadOptions={getBankList}
                getOptionLabel={(option) => option.name}
                placeholder="Search bank"
                cacheOptions
                defaultOptions
            />
        </div>
    );
};

export default BankSelect;
