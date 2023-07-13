import React from "react";
import RequestTable from "./components/table";
import { useFetchRequests } from "./hooks/fetchRequests";

export default function RequestHome() {
    const { requests } = useFetchRequests();

    return (
        <>
            <div>Request page</div>
            <RequestTable requests={requests} />
        </>
    );
}
