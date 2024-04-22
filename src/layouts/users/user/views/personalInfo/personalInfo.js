import { Suspense, useEffect, useState } from "react";
import { Button, Dialog, DialogContent, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { decodeToken } from "../../../../../utils/utils";
import Loading from "../../../../../common/loading/loading";
import { cacheData, getCache, items } from "../../../../../utils/dataOptimizer";
import AvatarForm from "./form/avatarForm";
import PasswordForm from "./form/passwordForm";

export default function PersonalInfo(props) {
  const token = decodeToken(localStorage.getItem("access_token"));
  const [user, setUser] = useState({});

  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  useEffect(() => {
    let data = getCache(items.UserDetails)
    if (data) {
      setUser(data)
    } else {
      fetchUserData();
    }

  }, []);

  const fetchUserData = () => {
    try {
      console.log(token);
      axios.get(process.env.REACT_APP_HOST_URL + "/user?id=" + token.id).then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          setUser(res.data.data[0]);
          cacheData(items.UserDetails, res.data.data[0])
        }
      });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div
        className="basic-info"
        style={{
          marginBottom: "40px",
          paddingTop: "10px"
        }}
      >
        <div
          onClick={() => {
            setOpenAvatarModal(true)
          }}
          className="profile-pic-container"
          style={{
            objectFit: 'cover',
            cursor: 'pointer',
            backgroundImage: `url(${process.env.REACT_APP_HOST_URL}` + user.path + `)`,
          }}
        ></div>
        <div className="user-contact">
          <div
            className="bold"
            style={{
              fontSize: "1.75rem",
              marginBottom: 0,
            }}
          >
            {user.lastName + " " + user.firstName}
          </div>
          <span>{user.major}</span>
        </div>
      </div>
      <div style={{
        margin: '10px 0 20px 0'
      }}>
        <Button onClick={() => setOpenPasswordModal(true)} variant="contained" style={{
          marginRight: '20px'
        }}>Edit Password</Button>
        <Button variant="contained" onClick={() => setOpenAvatarModal(true)}>Change Avatar</Button>
      </div>

      <div
        className="big-widget inner-widget"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="relative-container ">
          <h3 className="bold">Personal Information</h3>
          <Grid container className="personal-details-container">
            <Grid item xs={12} sm={6}>
              <p>First Name</p>
              <h4>{user.firstName}</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Last Name</p>
              <h4>{user.lastName}</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Date of birth</p>
              <h4>{user.dob}</h4>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <p>Email</p>
              <h4>{user.email}</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Phone</p>
              <h4>{user.phone}</h4>
            </Grid>
          </Grid>
        </div>
      </div>
      <br />
      <div
        className="big-widget inner-widget"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="relative-container ">
          <h3 className="bold">Address</h3>
          <Grid container className="personal-details-container">
            <Grid item xs={12} sm={6}>
              <p>Country</p>
              <h4>Vietnam</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>City</p>
              <h4>{user.city}</h4>
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>Address</p>
              <h4>{user.address}</h4>
            </Grid>
          </Grid>
        </div>
      </div>

      <Dialog className="modal" fullWidth={true} open={openAvatarModal} onClose={() => setOpenAvatarModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <AvatarForm sendToast={props.sendToast} user={user} refresh={() => {
            fetchUserData()
            window.location.reload()
          }} handleClose={() => setOpenAvatarModal(false)} />
        </DialogContent>
      </Dialog>

      <Dialog className="modal" fullWidth={true} open={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <PasswordForm sendToast={props.sendToast} user={user} refresh={fetchUserData} handleClose={() => setOpenPasswordModal(false)} />
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Suspense>
  );
}
