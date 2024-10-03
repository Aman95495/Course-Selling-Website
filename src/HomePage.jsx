import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <div>
          <Typography variant="h4">HOME PAGE</Typography>
        </div>{" "}
        <br />
        <div>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/admin_signup";
            }}
          >
            {" "}
            Admin Signup{" "}
          </Button>
        </div>
        <br />
        <div>
          {" "}
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/admin_signin";
            }}
          >
            {" "}
            Admin SignIn{" "}
          </Button>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/addcourses";
            }}
          >
            {" "}
            Add Courses{" "}
          </Button>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            onClick={() => {
              window.location.href = "/courses";
            }}
          >
            {" "}
            Courses{" "}
          </Button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default HomePage;
