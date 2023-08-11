import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useDispatchAndNext = () => {
    const dispatch = useDispatch();
    const next = useNavigate();

    return { dispatch, next }
}

const trimData = (data: object) => {
    const cleanedData = {};
    Object.keys(data).forEach(key => {
        cleanedData[key] = typeof data[key] === "string" ? data[key].trim() : data[key];
    });
    return cleanedData
}

export { useDispatchAndNext, trimData }