import axios from "axios";
import { useEffect, useState } from "react"

export default function CurriculumDialog(props) {

    useEffect(() => {
        console.log(props)
        fetchAssignments();
    }, [])

    const [assignments, setAssignments] = useState([]);

    const fetchAssignments = () => {
        axios.get(process.env.REACT_APP_HOST_URL + "/user/grades", {
            params: {
                student_id: props.subject.student_id,
                course_id: props.subject.course_id,
            }
        }).then((res) => {
            if (res.data.status) {
                console.log(res.data.data)
                setAssignments(res.data.data)
            }
        })
    }

    return (
        <>
            <div>

            </div>
        </>
    )
}