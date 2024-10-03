import * as React from "react";
import {
  TextField,
  Card,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

import { useState } from "react";

function AddCourses() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [courseFee, setCourseFee] = React.useState("");
  const [isPublished, setIsPublished] = React.useState("no");
  const [image, setImage] = React.useState('https://static.vecteezy.com/system/resources/previews/002/058/031/non_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCourseFeeChange = (event) => {
    const newValue = event.target.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      setCourseFee(newValue);
    }
  };

  const handleIsPublishedChange = (event) => {
    setIsPublished(event.target.value);
  };

  const handleImageChange = async (event) => {
    const imageUrl = event.target.value;
  
    if (imageUrl === "") {
      setImage('https://static.vecteezy.com/system/resources/previews/002/058/031/non_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg');
    } else {
      const isValidImage = await checkImageUrl(imageUrl);
      if (isValidImage) {
        setImage(imageUrl);
      } else {
        setImage('https://static.vecteezy.com/system/resources/previews/002/058/031/non_2x/picture-icon-photo-symbol-illustration-for-web-and-mobil-app-on-grey-background-free-vector.jpg');
      }
    }
  };
  
  const checkImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };
  

  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 15,
        }}
      >
        <Typography variant="h6" sx={{ color: "navy" }}>
          Welcome Add Courses Here
        </Typography>
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Card
          variant="outlined"
          sx={{
            p: 3,
            width: 600,
            boxShadow: 10,
            borderRadius: 3,
            marginRight: 2
          }}
        >
          <TextField
            label="Title"
            type="text"
            variant="outlined"
            sx={{
              width: 600,
              my: 1,
            }}
            onChange={handleTitleChange}

            required
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            multiline
            sx={{
              width: 600,
              my: 1,
            }}
            onChange={handleDescriptionChange}
            maxRows={2}

            required
          />
          <TextField
            id="outlined-textarea"
            label="Image Link"
            sx={{
              width: 600,
              my: 1,
            }}
            onChange={handleImageChange}
          />


          <br />

          <Typography variant="h6">Is Published</Typography>
          <RadioGroup
            aria-label="isPublished"
            defaultValue="no"
            name="isPublished"
            sx={{
              mb: 1,
            }}
            onChange={handleIsPublishedChange}
          >
            <FormControlLabel
              value="yes"
              control={<Radio color="success" />}
              label="Yes"
            />
            <FormControlLabel
              value="no"
              control={<Radio color="warning" />}
              label="No"
            />
          </RadioGroup>

          <InputLabel htmlFor="outlined-adornment-amount" sx={{ marginTop: 1 }}>
            Course Fee
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={courseFee}
            onChange={handleCourseFeeChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            sx={{
              mb: 2,
            }}
            required
          />
          <br />

          <Button
            variant="contained"
            sx={{
              fontSize: 16,
              mt: 1,
            }}
            onClick={() => { 
              let message = "";
              if((title == "") || (description == "") || (courseFee == "") || (image.name == "")){
                message = "Please fill all the fields.";
              }

              else{
                fetch('http://localhost:3000/admin/courses', 
                  {
                    method: 'POST',
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization': 'Bearer '+ localStorage.getItem('SignIn_Token')
                    },
                    body: JSON.stringify({ 
                          "title": title,
                          "description": description, 
                          "price": parseFloat(courseFee),
                          "imageLink": image, 
                          "published": (isPublished=="no"?false:true)
                      }
                    )
                  }
                ).then((response)=>{
                  if(response.ok){
                    message = "Course added successfully.";
  
                  }
                  else{
                    message = "Failed to add course.";
                  }

                  document.getElementById('addcourseResponse').innerHTML = message;

                }).then(()=>{
                  setTimeout(()=>{
                    document.getElementById('addcourseResponse').innerHTML = "";
                    window.location.reload();
                  }, 2000);
                })
              }

            }}
          >
            Add Course
          </Button>
          <Typography
            id="addcourseResponse"
            variant="h7"
            sx={{ ml: 3, color: "tomato" }}
          ></Typography>
        </Card>

        <Card
          variant="outlined"
          sx={{
            p: 3,
            width: 250,
            boxShadow: 10,
            borderRadius: 3,
            textAlign: "center",
            marginLeft: 2
          }}
        >
          <div>
            <img src={image} style={{
              width: 250,
              height: 250,
              marginBottom: 20,
              borderRadius: 10
            }}/>
          </div>


          <Typography variant="h6">{title || "Title of Course"}</Typography>

          <DescriptionPreview description={description}></DescriptionPreview>

          <Typography variant="h6" sx={{ mt: 3 }}>
            $ {courseFee || "0.00"}
          </Typography>
        </Card>
      </div>
    </>
  );
}

function DescriptionPreview(props) {
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div style={{ width: "250px" }}>
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "normal",
          overflow: "hidden",
          display: showFullDescription ? "block" : "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: showFullDescription ? "none" : 3,
          textOverflow: "ellipsis",
        }}
      >
        {props.description}
      </Typography>
      {props.description.length > 100 && (
        <Button
          onClick={toggleDescription}
          sx={{ mt: 1, fontSize: "12px", textTransform: "none" }}
        >
          {showFullDescription ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
}

export default AddCourses;
