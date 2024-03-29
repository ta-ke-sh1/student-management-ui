import { Suspense, useEffect, useState } from "react";
import { Dialog, DialogContent, Grid, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { decodeToken } from "../../../../../utils/utils";
import Loading from "../../../../../common/loading/loading";
import AddressForm from "./form/addressForm";
import InformationForm from "./form/informationForm";

export default function PersonalInfo(props) {
  const token = decodeToken(localStorage.getItem("access_token"));
  const [user, setUser] = useState({});

  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openInformationModal, setOpenInformationModal] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    try {
      console.log(token);
      axios.get(process.env.REACT_APP_HOST_URL + "/user?id=" + token.id).then((res) => {
        if (!res.data.status) {
          props.sendToast("error", res.data.data);
        } else {
          console.log(res.data);
          setUser(res.data.data[0]);
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
        }}
      >
        <div
          className="profile-pic-container"
          style={{
            backgroundImage: `url(${process.env.REACT_APP_HOST_URL}` + token.avatar + `)`,
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
      <div
        className="big-widget inner-widget"
        style={{
          backgroundColor: "white",
        }}
      >
        <div className="relative-container ">
          <Tooltip title={"Edit"}>
            <IconButton
              className="icon-btn"
              onClick={() => {
                setOpenInformationModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip title={"Edit"}>
            <IconButton
              className="icon-btn"
              onClick={() => {
                setOpenAddressModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
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

      <Dialog className="modal" fullWidth={true} open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <AddressForm sendToast={props.sendToast} user={user} refresh={fetchUserData} />
        </DialogContent>
      </Dialog>

      <Dialog className="modal" fullWidth={true} open={openInformationModal} onClose={() => setOpenInformationModal(false)}>
        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 12,
          }}
        >
          <InformationForm sendToast={props.sendToast} user={user} refresh={fetchUserData} />
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Suspense>
  );
}
