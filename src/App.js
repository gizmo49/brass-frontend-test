import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import FundsTransfer from "./components/pages/FundsTransfer/FundsTransfer";
import FundsTransferHistory from "./components/pages/FundsTransferHistory/FundsTransferHistory";

function App() {
    return (
        <>
            <Router>
                <Header />
                <Route exact path="/funds-transfer" component={FundsTransfer} />
                <Route
                    exact
                    path="/transfer-history"
                    component={FundsTransferHistory}
                />
            </Router>
        </>
    );
}

export default App;
