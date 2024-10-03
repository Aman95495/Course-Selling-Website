import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

function Appbar() {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Attempt to fetch user data
        fetch('http://localhost:3000/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('SignIn_Token')
            }
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    console.log('User Data:', data);
                    setUsername(data.username);
                    setRole('user');
                    localStorage.setItem('role', 'user');
                });
            } else {
                // If the user route fails, attempt to fetch admin data
                fetch('http://localhost:3000/admin/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('SignIn_Token')
                    }
                }).then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            console.log('Admin Data:', data);
                            setUsername(data.username);
                            setRole('admin');
                            localStorage.setItem('role', 'admin');
                        });
                    } else {
                        // If both requests fail, handle the error (e.g., token is invalid)
                        console.error('Error: Invalid token or user/admin not found.');
                    }

                    
                });
            }
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('SignIn_Token');
        localStorage.removeItem('role')
        window.location.reload();
    };

    if (username && role) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <div>
                    <Typography variant="h5" sx={{ color: "green" }}>
                        <i>CS</i>
                    </Typography>
                </div>
                <div>
                    <Typography variant="h7" sx={{ color: "green" }}>
                        <i>{username} ({role === 'admin' ? 'Admin' : 'User'})</i>
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <div>
                    <Typography variant="h5" sx={{ color: "green" }}>
                        <i>CS</i>
                    </Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        onClick={() => {
                            window.location = '/user_signin';
                        }}
                    >
                        Signin
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ mx: 1 }}
                        onClick={() => {
                            window.location = '/user_signup';
                        }}
                    >
                        Signup
                    </Button>
                </div>
            </div>
        );
    }
}

export default Appbar;
