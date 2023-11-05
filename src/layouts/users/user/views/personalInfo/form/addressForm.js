import { Button, FormControl, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import address_tree from "../../../../../../utils/address_tree.json";

export default function AddressForm(props) {
  const [formData, setFormData] = useState({
    city: props.user.dob ?? "",
    district: props.user.district ?? "",
    ward: props.user.ward ?? "",
    address: props.user.address ?? "",
  });

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    let citiesMap = objectToMap(address_tree);
    setCities(citiesMap);
  }, []);

  function objectToMap(object) {
    return Object.values(object);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => { }, []);

  function handleConfirm() {
    try {
      axios
        .post(process.env.REACT_APP_HOST_URL + "/user/address", {
          formData,
        })
        .then((res) => {
          if (!res.data.status) {
            props.sendToast("error", res.data.data);
          }
        });
    } catch (e) {
      props.sendToast("error", e.toString());
    }
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <InputLabel id="city-select-label-form">City</InputLabel>
            <Select
              name="city"
              defaultValue={formData.city ?? "01"}
              value={formData.city ?? "01"}
              label="Campus"
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: (e) => {
                  e.preventDefault();
                },
              }}
              onChange={(e) => {
                handleChange(e);
                let districtsMap = objectToMap(cities[e.target.value]["quan-huyen"]);
                setDistricts(districtsMap);
              }}
            >
              <MenuItem value={"default"} disabled>
                Please select a City
              </MenuItem>
              {cities.map((item) => (
                <MenuItem key={item.id} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <InputLabel id="city-select-label-form">District</InputLabel>
            <Select
              name="district"
              defaultValue={formData.district ?? "01"}
              value={formData.district ?? "01"}
              label="District"
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: (e) => {
                  e.preventDefault();
                },
              }}
              onChange={(e) => {
                handleChange(e);
                let wardsMap = objectToMap(districts[e.target.value]["xa-phuong"]);
                setWards(wardsMap);
              }}
            >
              <MenuItem value={"default"} disabled>
                Please select a District
              </MenuItem>
              {districts.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <InputLabel id="city-select-label-form">Ward</InputLabel>
            <Select
              name="ward"
              defaultValue={formData.ward ?? "01"}
              value={formData.ward ?? "01"}
              label="Ward"
              MenuProps={{
                disablePortal: true, // <--- HERE
                onClick: (e) => {
                  e.preventDefault();
                },
              }}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <MenuItem value={"default"} disabled>
                Please select a Ward
              </MenuItem>
              {wards.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
