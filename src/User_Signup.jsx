import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function User_Signup() {
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
        <Typography variant="h6" sx={{ color: "navy" }}>
          Welcome To CS. SignUp Here
        </Typography>
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
            id={"username"}
            label="Username/Email"
            variant="outlined"
            sx={{
              width: 400,
            }}
            onChange={(ele) => {
              setUsername(ele.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id={"password"}
            label="Password"
            type="password"
            variant="outlined"
            sx={{
              width: 400,
            }}
            onChange={(ele) => {
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
              let store = (data) => {
                localStorage.setItem("SignUp_Token", data.token);
                window.location.href = '/user_signin';
              };

              fetch("http://localhost:3000/user/signup", {
                method: "POST",
                body: JSON.stringify({
                  "username": username,
                  "password": password
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => {
                if (!response.ok) {
                  document.getElementById("signupResponse").innerHTML =
                    "* user already exists";
                } else {
                  response.json().then(store);
                }
              })
            }}
          >
            Signup
          </Button>
          <Typography
            id="signupResponse"
            variant="h7"
            sx={{ ml: 3, color: "tomato" }}
          ></Typography>
        </Card>
      </div>
    </div>
  );
}

export default User_Signup;
