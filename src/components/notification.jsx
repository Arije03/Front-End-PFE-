import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
  Button,
} from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import axios from "axios";
const Notification = () => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const pusher = new Pusher("a8470ae2d9e274a754c5", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("job-application-channel.2");

    channel.bind("JobApplicationCreated", function (data) {
      console.log("Notification reçue", data);

      // Update the state with the new notification
      setNotifications((prevNotifications) => [
        {id: data.jobapplication.id,
        
          user_id: data.jobapplication.user_id,
          text: data.jobapplication.text,
        },
        ...prevNotifications,
      ]);

      // Increment unread notifications count
      setUnreadNotifications((count) => count + 1);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadNotifications(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAccept = (id) => {
    axios
      .put(`http://localhost:8000/api/accept_job_application/${id}`
      )
      .then((response) => {
        console.log(response.data);
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === id) {
            notification.accepted = true;
            notification.validated = true; // Nouvelle clé "validated"
            notification.showValidatedMessage = true;
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handlerefuse = (id) => {
    axios
      .put(`http://localhost:8000/api/refuse_job_application/${id}`
      )
      .then((response) => {
        console.log(response.data);
        const updatedNotifications = notifications.map((notification) => {
          if (notification.id === id) {
            notification.accepted = true;
            notification.validated = false; // Nouvelle clé "validated"
            notification.showValidatedMessage = true;
          }
          return notification;
        });
        setNotifications(updatedNotifications);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <IconButton onClick={handleNotificationsClick}>
        <Badge badgeContent={unreadNotifications} color="error">
          <NotificationsOutlinedIcon />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {notifications.map((notification, index) => (
          <Box sx={{ p: 2, width: "300px" }} key={index}>
              <Typography>
      {notification.showValidatedMessage && notification.validated
        ? "Job application accepté avec succès"
        : notification.showValidatedMessage && !notification.validated
        ? "Job application refusé avec succès"
        : notification.message}
    </Typography>
            <Typography>{notification.message}</Typography>
            <Typography variant="body1">
              ID user: {notification.user_id}

            </Typography>
            <Typography variant="body1">
              text: {notification.text}
              
            </Typography>
            {!notification.accepted && !notification.refused && (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAccept(notification.id)}
                >
                  Accept
                </Button>
                <Button variant="contained" color="secondary"
                onClick={() => handlerefuse(notification.id)}>
                  Refuse
                </Button>
              </div>
            )}
            <Divider />
          </Box>
        ))}
      </Popover>
    </div>
  );
};

export default Notification;
