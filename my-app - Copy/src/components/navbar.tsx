import { NavLink, useNavigate } from "react-router-dom";
import Login from "../pages/login";
import { useState, useEffect } from "react";

function Navbar () {
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        //jwt token check

        const saved = localStorage.getItem("currentUser");
        if (saved) {
            setCurrentUser(JSON.parse(saved));
        }
        const savedToken = localStorage.getItem("token");
        setToken(savedToken);



    }, []);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    return (
        <>
            <nav className="w-full bg-gray-100 shadow  px-6 py-2 flex items-center justify-between">

                <h1 className="text-xl font-semibold text-gray-800">Project Manager</h1>

                <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
                    &#9776;
                </button>

                <div className="hidden md:flex items-center gap-6">
                    <NavLinkItem to="/dashboard" label="Dashboard" />
                    
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {!token ? (
                        <button onClick={() => setShowLogin(true)} className="bg-gray-200 px-4 py-2 rounded-lg">
                            Login
                        </button>
                    ) : (
                        <>
                            <span>Hi, {currentUser.username}</span>
                            <button onClick={handleLogout} className="bg-red-300 hover:bg-red-400 text-white px-4 py-2 rounded-lg">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {open && (
                <div className="md:hidden bg-white text-center shadow px-6 py-4 space-y-4">
                    <NavLinkItem to="/dashboard" label="Dashboard" onClick={() => setOpen(false)} />
                    
                    {!token ? (
                        <button onClick={() => {
                            setShowLogin(true);
                            setOpen(false);
                        }} className=" bg-gray-200 px-4 py-2 rounded-lg"
                        >
                            Login
                        </button>
                    ) : (
                        <button onClick={handleLogout} className=" bg-red-500 text-white px-4 py-2 rounded-lg">
                            Logout
                        </button>
                    )}
                </div>
            )}

            {showLogin && (
                <Login
                    onClose={() => {
                        setShowLogin(false);
                        const saved = localStorage.getItem("token");
                        if (saved) setToken(saved);
                    }}
                />
            )}
        </>
    );
}

function NavLinkItem({ to, label, onClick }: any) {
    return (
        <NavLink to={to} onClick={onClick} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-black"}`} >
            {label}
        </NavLink>
    );
}

export default Navbar;
