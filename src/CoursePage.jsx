import { useState } from "react";
import {
  TextField,
  Card,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import * as React from "react";

function CoursePage() {
  let [courses, setCourses] = useState([]);
  let [selectedCourse, setSelectedCourse] = useState(null);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Modal
  let [isViewModalOpen, setIsViewModalOpen] = useState(false); // State for View Modal
  let [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
  });

  let role = localStorage.getItem("role");

  React.useEffect(() => {
    if (role == "admin") {
      fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("SignIn_Token"),
        },
      }).then((response) => {
        response.json().then((data) => {
          setCourses(data.courses);
        });
      });
    } else if (role == "user") {
      fetch("http://localhost:3000/user/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("SignIn_Token"),
        },
      }).then((response) => {
        response.json().then((data) => {
          setCourses(data.courses);
        });
      });
    } else {
      fetch("http://localhost:3000/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        response.json().then((data) => {
          setCourses(data.courses);
        });
      });
    }
  }, []);

  const handleEditDetails = (course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.imageLink,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateCourse = () => {
    fetch(`http://localhost:3000/admin/courses/${selectedCourse._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("SignIn_Token"),
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        alert("Course updated successfully");
        setIsEditModalOpen(false);
        window.location.reload(); // Refresh page to reflect changes
      } else {
        alert("Failed to update course");
      }
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <DisplayCourse
              id={course.id}
              course={course}
              role={role}
              onEditDetails={() => handleEditDetails(course)}
              onViewDetails={() => handleViewDetails(course)}
            ></DisplayCourse>
          </div>
        );
      })}

      {/* Edit Course Details Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Course Details
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image Link"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateCourse}
            sx={{ mt: 2 }}
            fullWidth
          >
            UPDATE
          </Button>
        </Box>
      </Modal>

      {/* View Course Details Modal */}
      <Modal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        aria-labelledby="view-modal-title"
        aria-describedby="view-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60vw",
            height: "80vh",
            bgcolor: "black",
            border: "2px solid #000",
            boxShadow: 24,
            p: "2px",
          }}
        >
          <SingleCourseDetails course={selectedCourse} role={role} />
        </Box>
      </Modal>
    </div>
  );
}

let DisplayCourse = (props) => {
  const isAdmin = props.role === "admin";

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        width: 250,
        boxShadow: 10,
        borderRadius: 3,
        textAlign: "center",
        position: "relative",
        my: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.08)",
        },
      }}
    >
      <div>
        <img
          src={props.course.imageLink}
          alt={props.course.title}
          style={{
            width: 250,
            height: 200,
            marginBottom: 20,
            borderRadius: 10,
          }}
        />
      </div>

      <Typography variant="h6">{props.course.title}</Typography>

      <DescriptionPreview
        description={props.course.description}
      ></DescriptionPreview>

      <Typography variant="h6" sx={{ my: 1 }}>
        $ {props.course.price}
      </Typography>

      {isAdmin ? (
        <Button
          color="secondary"
          onClick={() => props.onEditDetails(props.course)}
        >
          Edit Details
        </Button>
      ) : (
        <Button
          color="secondary"
          onClick={() => props.onViewDetails(props.course)}
        >
          View Details
        </Button>
      )}
    </Card>
  );
};

function DescriptionPreview(props) {
  return (
    <div
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "40px",
        display: "-block",
      }}
    >
      {props.description.length < 60
        ? props.description
        : props.description.substr(0, 60) + "..."}
    </div>
  );
}

let SingleCourseDetails = (props) => {
  const handlePayment = (courseId) => {
    console.log(courseId);
    fetch(`http://localhost:3000/user/courses/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("SignIn_Token"),
      },
    }).then((response) => {
      if (response.ok) {
        document.getElementById("paymentResponse").innerHTML =
          "Course Purchased Successfully";
      } else {
        document.getElementById("paymentResponse").innerHTML = "SignIn/SignUp Please";
      }

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  };

  return (
    <Card
      sx={{
        width: "60vw",
        height: "80vh",
        backgroundColor: "#fff",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <img
        src={props.course.imageLink}
        alt={props.course.title}
        style={{
          width: "59vw",
          height: 250,
          mx: 10,
          borderRadius: 5,
          alignItems: "center"
        }}
      />

      <Typography variant="h5">{props.course.title}</Typography>

      <Typography>{props.course.description}</Typography>

      <Typography variant="h6" sx={{ my: 1 }}>
        $ {props.course.price}
      </Typography>

      <Button
        color="success"
        variant="contained"
        onClick={() => handlePayment(props.course._id)}
      >
        Buy Course
      </Button>

      <Typography
        variant="h7"
        sx={{ color: "red" }}
        id="paymentResponse"
      ></Typography>
    </Card>
  );
};

export default CoursePage;
