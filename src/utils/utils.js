import moment from "moment";
import jwt_decode from "jwt-decode";

export const host_url = "https://tch2202.onrender.com";

export const convertSecondsToTime = (input) => {
    var seconds = input;
    var days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    return {
        days: days,
        hours: hrs,
        minutes: mnts,
        seconds: seconds,
    };
};

export function randomIntWithinRange(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export const fromMilisecondsToDate = (milisecondsSinceEpoch) => {
    const date = new Date(milisecondsSinceEpoch * 1000);
    return date.toUTCString();
};

export function convertStringToArray(input) {
    if (input.startsWith("[")) {
        input = input.substring(1, input.length);
    }
    if (input.endsWith("]")) {
        input = input.substring(0, input.length - 1);
    }
    return input.split(",");
}

export function isExpired(secondsSinceEpoch) {
    return secondsSinceEpoch < Date.now() / 1000;
}

export function isExpiredToken(secondsSinceEpoch) {
    return secondsSinceEpoch < Date.now() / 1000;
}

export function convertDateToDayOfTheWeek(date) {
    var day = moment(date, "DD MMM YYYY");
    return day.format("ddd");
}

export function getCurrentDateAsDBFormat() {
    return moment().format("YYYY/M/D");
}

export function decodeToken(token) {
    return jwt_decode(token.substring(7, token.length));
}

export const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}