import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssignmentTab(props) {

    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        fetchRows();
    }, [])

    function fetchRows() {
        try {
            axios.get(process.env.REACT_APP_HOST_URL + "/course/courseworks?id=" + props.course.id).then((res) => {
                if (res.data.status) {
                    setAssignments(res.data.data)
                } else {
                    props.sendToast("error", res.data.data)
                }
            })
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    return (<>
        <h1>Assignment Tab</h1>
        <Button onClick={() => {
            props.handleSelectTab(0)
        }}>
            Return
        </Button>
    </>)
}