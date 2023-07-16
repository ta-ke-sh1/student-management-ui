import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchSchedules = (weekNumber = 0) => {
    const [schedules, setSchedules] = useState([]);

    const fetchSchedules = async (weekNumber) => {
        const response = await axios.get(
            process.env.REACT_APP_HOST_URL + "/schedule?campus=Hanoi&week=" + weekNumber
        );

        if (response && response.data) setSchedules(response.data);
    };

    useEffect(() => {
        fetchSchedules(weekNumber);
    }, [weekNumber]);

    return { schedules };
};
