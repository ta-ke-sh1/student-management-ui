import { Grid, FormControl, Box, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchRequests } from "./api/apiFunctions";

export default function CompoundSearch() {
  const { data } = useFetchRequests("https://jsonplaceholder.typicode.com/todos/");

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
        }}
      >
        <br />
        <br />
        <br />
        <br />
        <Grid container spacing={2}>
          {data.map((d, index) => {
            return (
              <p>
                {index} - {d.id}
              </p>
            );
          })}
        </Grid>
      </div>
    </>
  );
}
