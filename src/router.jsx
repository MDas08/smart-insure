import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import ClaimInit from "./pages/ClaimInit";
import DocUpload from "./pages/DocUpload";
import Login from "./pages/Login";
import ReportPage from "./pages/Report";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "./utils/axiosConf";
import Dashboard from "./pages/Dashboard";
import store from './store/storeConf';
import ViewClaim from "./pages/ViewClaim";

export const router = createBrowserRouter([
    {
        path: '/', element: <NavLayout />, children: [
            { path: "", element: <Dashboard />, loader: dashboardLoader },
            { path: "new-claim", element: <ClaimInit /> },
            { path: "upload-docs/:claimId", element: <DocUpload />, loader: docUploadLoader },
            { path: "login", element: <Login /> },
            { path: "view-report/:reportId", element: <ReportPage />, loader: viewReportLoader },
            { path: "view-claim/:claimId", element: <ViewClaim />, loader: viewClaimLoader },
        ]
    }
])

function docUploadLoader() {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    return null
}

async function dashboardLoader() {
    const userState = store.getState().user

    if (!userState.authToken) return redirect('/login')

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    let res = ''
    if (userState.role === 'CLAIM_ASSESSOR') {
        res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/claim/pending`, header)
    } else if (userState.role === "POLICY_HOLDER") {
        res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/claim/my-claims`, header)
    } else {
        return { err: 'Invalid role' }
    }

    if (res.data.err) {
        alert(res.data.err)
        return { err: res.data.err }
    }
    return res.data.msg
}

async function viewReportLoader(req) {
    const userState = store.getState().user

    if (!userState.authToken) return redirect('/login')

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/report/${req.params.reportId}`, header)
    if (res.data.err) {
        alert(res.data.err)
        return { err: res.data.err }
    }
    return res.data.msg
}

async function viewClaimLoader(req) {
    const userState = store.getState().user

    if (!userState.authToken) return redirect('/login')

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    const url = `${process.env.REACT_APP_BACKEND_DOMAIN}/claim/${req.params.claimId}`
    const res = await axios.get(url, header)
    if (res.data.err) {
        alert(res.data.err)
        return { err: res.data.err }
    }
    return res.data.msg
}

function NavLayout() {
    return (<>
        <Navbar />
        <Outlet />
        <Footer />
    </>)
}
