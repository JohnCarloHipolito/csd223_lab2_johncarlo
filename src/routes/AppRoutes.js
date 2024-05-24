import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import TransactionPage from "../pages/TransactionPage";
import {Component} from "react";
import SignupPage from "../pages/SignupPage";

class AppRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/deposit" element={<TransactionPage type="deposit"/>}/>
                <Route path="/withdrawal" element={<TransactionPage type="withdrawal"/>}/>
                <Route path="/transfer" element={<TransactionPage type="transfer"/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        );
    }
}

export default AppRoutes;