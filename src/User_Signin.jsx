import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function User_Signin() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 100,
          paddingBottom: 15,
        }}
      >
        <Typography variant="h6" sx={{color: 'navy'}}>Welcome Back. SignIn Here</Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            p: 3,
            width: 400,
            boxShadow: 10,
            borderRadius: 3,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username/Email"
            variant="outlined"
            sx={{
              width: 400,
            }}

            onChange={(ele)=>{
                setUsername(ele.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            sx={{
              width: 400,
            }}

            onChange={(ele)=>{
                setPassword(ele.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            sx={{
              fontSize: 15,
            }}

            onClick={() => {
                

                let store = (data)=>{
                    localStorage.setItem("SignIn_Token", data.token)
                    window.location.href = '/';
                }

                fetch("http://localhost:3000/user/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "username": username,
                      "password": password
                    })
                }).then((response) => {
                    if (!response.ok) {
                        document.getElementById("signinResponse").innerHTML =
                            "* invalid details";
                        }

                    else{
                            response.json().then(store);
                    }
                })
            }}
          >
            Signin
          </Button>
          <Typography
                id="signinResponse"
                variant="h7"
                sx={{ ml: 3, color: "tomato" }}
            ></Typography>
        </Card>
      </div>
    </div>
  );
}

export default User_Signin;
