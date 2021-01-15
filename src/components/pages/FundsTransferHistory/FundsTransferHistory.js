import React, { useEffect, useCallback, useState } from "react";
import {
    formatCurrency,
    getErrorMessage,
    SmartTime,
} from "../../../utils/helper";
import API from "../../../lib/api";
import CustomPagination from "../../../utils/CustomPagination/CustomPagination";

const TransfersTable = ({ pageSize, data, currentPage, goToPage }) => {
    const TransferRow = ({
        row: {
            createdAt,
            amount,
            recipient: {
                details: { account_number, bank_name },
            },
        },
    }) => {
        return (
            <tr>
                <td>{SmartTime(createdAt)}</td>
                <td>{formatCurrency(amount / 100)}</td>
                <td>{bank_name}</td>
                <td>{account_number}</td>
            </tr>
        );
    };
    const TFTableHead = () => (
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Bank</th>
                <th>Account Number</th>
            </tr>
        </thead>
    );
    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table">
                    <TFTableHead />
                    <tbody>
                        {data.map((item, index) => (
                            <TransferRow key={index} row={item} />
                        ))}
                    </tbody>
                </table>
            </div>
            <CustomPagination
                currentPage={currentPage}
                pageSize={pageSize}
                goToPage={goToPage}
            />
        </div>
    );
};

const FundsTransferHistory = () => {
    const [metaInfo, setMetaInfo] = useState({});
    const [page, setPage] = useState(0);
    const [fetching, setFetchStatus] = useState(true);
    const [serverError, setServerError] = useState({
        status: false,
        message: "",
    });
    const [transferList, setTransferList] = useState([]);

    const fetchAllTransfers = useCallback(
        async function fetchTransferList() {
            try {
                setFetchStatus(true);
                setServerError({
                    status: false,
                    message: "",
                });
                const res = await API.get("/transfer", {
                    params: {
                        page,
                        perPage: 10,
                    },
                });
                if (res.status === 200) {
                    setMetaInfo(res.data.meta);
                    setTransferList(res.data.data);
                    setFetchStatus(false);
                }
            } catch (err) {
                setMetaInfo({});
                setServerError({
                    status: true,
                    message: getErrorMessage(err),
                });
                setFetchStatus(false);
            }
        },
        [page]
    );

    useEffect(() => {
        fetchAllTransfers();
    }, [fetchAllTransfers]);

    function goToPage(page) {
        setPage(page);
        fetchAllTransfers();
    }

    function renderBasedOnState() {
        if (fetching) return <h4>fetching transactions...</h4>;
        if (serverError.status) return <h4>{serverError.message}</h4>;

        if (transferList?.length === 0) {
            return (
                <p className="py-5 text-center text-secondary font-italic">
                    No record found.
                </p>
            );
        }

        return (
            <TransfersTable
                data={transferList}
                pageSize={metaInfo.pageCount}
                goToPage={goToPage}
            />
        );
    }

    return (
        <div className="container">
            <h1>History</h1>
            <div className="mt-3">{renderBasedOnState()}</div>
        </div>
    );
};

export default FundsTransferHistory;
