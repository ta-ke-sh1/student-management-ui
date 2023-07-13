import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchRequests = () => {
    const [requests, setRequest] = useState([]);
    const [err, setError] = useState(null);

    const fetchRequest = async () => {
        const response = await axios
            .get(process.env.REACT_APP_HOST_URL + "/request")
            .then((response) => {
                if (response.status !== 200) {
                    setError(response.data);
                }
            });
        if (response && response.data) setRequest(response.data);
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    return { requests, err };
};
