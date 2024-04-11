import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CourseworkLecturer(props) {
    console.log(props);
    const [hasFetch, setHasFetch] = useState(false);
    const [submissions, setSubmission] = useState([]);

    function fetchAssignments(id) {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/submission/course", {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (res.data.status) {
                    setSubmission(res.data.data);
                    setHasFetch(true);
                } else {
                    props.sendToast("error", "Failed to fetch assignments");
                }
            });
    }

    return (
        <>
            <div
                style={{
                    borderBottom: "1px solid black",
                    marginBottom: "20px",
                    paddingBottom: "10px",
                }}>
                {props.course.assignments ? (
                    props.course.assignments.map((assignment) => {
                        return (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    fetchAssignments(assignment.id);
                                }}>
                                {assignment.id}
                            </Button>
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
            <div>
                {hasFetch && submissions.length > 0 ? (
                    submissions.map((submission) => {
                        return <>{submission.id}</>;
                    })
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
