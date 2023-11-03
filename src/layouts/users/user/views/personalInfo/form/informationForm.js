import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function InformationForm(props) {
  const [formData, setFormData] = useState({
    firstName: props.user.firstName ?? "",
    lastName: props.user.lastName ?? "",
    dob: props.user.dob ?? "",
    email: props.user.email ?? "",
    phone: props.user.phone ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {}, []);

  function handleConfirm() {
    try {
      axios
        .post(process.env.REACT_APP_HOST_URL + "/user/information", {
          formData,
        })
        .then((res) => {
          if (!res.data.status) {
            props.sendToast("error", e.toString());
          }
        });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}></Grid>
        <Grid item xs={6} sm={6}>
          <Button onClick={handleConfirm}>Confirm</Button>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Button>Cancel</Button>
        </Grid>
      </Grid>
    </>
  );
}
