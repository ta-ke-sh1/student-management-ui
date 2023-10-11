import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchHomeData = () => {
    const [coursesRegistration, setCoursesRegistration] = useState([]);

    const fetchSchedules = async () => {
        const response = await axios.get(
            process.env.REACT_APP_HOST_URL + "/course?campus=HaNoi"
        );

        if (response && response.data) setCoursesRegistration(response.data.data ?? []);
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return { coursesRegistration };
};
