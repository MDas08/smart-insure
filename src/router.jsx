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
import UpdateReport from "./pages/UpdateReport";
import ViewUser from "./pages/ViewUser";
import MyProfile from "./pages/MyProfile";
import EditClaim from "./pages/EditClaim";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";

export const router = createBrowserRouter([
    {
        path: '/', element: <NavLayout />, children: [
            { path: "", element: <HomePage /> },
            { path: "dash", element: <Dashboard />, loader: dashboardLoader },
            { path: "new-claim", element: <ClaimInit />, loader: claimInitLoader },
            { path: "upload-docs/:claimId", element: <DocUpload />, loader: docUploadLoader },
            { path: "login", element: <Login /> },
            { path: "view-report/:reportId", element: <ReportPage />, loader: viewReportLoader },
            { path: "view-claim/:claimId", element: <ViewClaim />, loader: viewClaimLoader },
            { path: "update-report/:reportId", element: <UpdateReport />, loader: updateReportLoader },
            { path: "view-user/:userId", element: <ViewUser />, loader: viewUserLoader },
            { path: "my-profile", element: <MyProfile />, loader: myProfileLoader },
            { path: "edit-claim/:claimId", element: <EditClaim />, loader: editClaimLoader },
            { path: "signup", element: <Signup /> },
            //{ path: "home", element: <HomePage/> },
        ]
    }
])

async function viewUserLoader(req) {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    if (userState.role === "POLICY_HOLDER") {
        alert('Insufficient permission to view user')
        return redirect('/')
    }
    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/details/${req.params.userId}`, header)
    if (res.data.err) {
        alert(res.data.err)
        return redirect('/')
    }
    return res.data.msg
}

async function editClaimLoader(req) {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    if (userState.role === "CLAIM_ASSESSOR") {
        alert('Only policy holders can edit thier claims')
        return redirect('/')
    }

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/claim/${req.params.claimId}`, header)
    if (res.data.err) {
        alert(res.data.err)
        return redirect('/')
    }
    return res.data.msg
}

async function myProfileLoader() {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }

    const [resUser, resClaims] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/user/my-details`, header),
        userState.role === 'CLAIM_ASSESSOR'
            ? axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/claim/pending`, header)
            : axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/claim/my-claims`, header),
    ]);

    // Check for errors in each response
    if (resUser.data.err) {
        alert(resUser.data.err);
        return redirect('/');
    } else if (resClaims.data.err) {
        alert(resClaims.data.err);
        return { err: resClaims.data.err };
    }

    // Combine data into a single response object
    const response = {
        userDetails: resUser.data.msg, // Assuming data contains user details
        claims: resClaims.data.msg, // Assuming data contains claims
    };

    return response;

}

async function docUploadLoader(req) {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    if (userState.role === "CLAIM_ASSESSOR") {
        alert('Only policy holders can upload document on their claims')
        return redirect('/')
    }
    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/document/count/${req.params.claimId}`, header)
    if (res.data.err) {
        alert(res.data.err)
        return redirect('/')
    }
    return (15 - res.data.msg)
}

function claimInitLoader() {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    if (userState.role === "CLAIM_ASSESSOR") {
        alert('Only policy holders can initialize claims')
        return redirect('/')
    }
    return null
}

async function updateReportLoader(req) {
    const userState = store.getState().user
    if (!userState.authToken) return redirect('/login')
    if (userState.role === "POLICY_HOLDER") {
        alert('Insufficient permission to update claim')
        return redirect('/')
    }

    const header = {
        headers: {
            Authorization: `Bearer ${userState.authToken}`
        }
    }
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_DOMAIN}/report/${req.params.reportId}`, header)
    if (res.data.err) {
        alert(res.data.err)
        return redirect('/')
    }
    return res.data.msg
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
    return (<div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
    </div>)
}
