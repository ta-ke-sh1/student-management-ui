import axios from "axios";
import { useEffect, useState } from "react";

export default function CourseworkLecturer(props) {
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchCourseworks();
    }, []);

    function fetchCourseworks() {
        try {
            axios
                .get(
                    process.env.REACT_APP_HOST_URL +
                        "/course/courseworks?id=" +
                        props.course.id
                )
                .then((res) => {
                    if (res.data.status) {
                        setAssignments(res.data.data);
                        fetchSubmissions(res.data.data);
                    } else {
                        props.sendToast("error", res.data.data);
                    }
                });
        } catch (e) {
            props.sendToast("error", e.toString());
        }
    }

    const fetchSubmissions = (assignments) => {
        assignments.forEach((assignment) => {
            fetchAssignments(assignment.id);
        });
    };

    function fetchAssignments(id) {
        axios
            .get(process.env.REACT_APP_HOST_URL + "/submission")
            .then((res) => {
                if (res.status) {
                } else {
                    props.sendToast("error", "Failed to fetch assignments");
                }
            });
    }

    return <>{assignments.map((assignment, index) => {})}</>;
}
