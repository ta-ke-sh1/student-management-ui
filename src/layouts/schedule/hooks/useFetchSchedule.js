import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchSchedules = () => {
    const [schedules, setSchedules] = useState([]);

    const fetchSchedules = async () => {
        const response = await axios.get(
            process.env.REACT_APP_HOST_URL + "/schedule?campus=Hanoi"
        );

        if (response && response.data) setSchedules(response.data);
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    return { schedules };
};
