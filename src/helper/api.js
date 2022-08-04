import axios from "axios";

export const API_URL = "http://localhost:5000";

const instance = axios.create(
    {
        baseURL: API_URL,
    }
)

export const post = async (url, params, config) => {
    const { data } = await instance.post(url, params, config)
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if(error.request) {
                console.log(error.request);
            }
            else {
                console.log("Error",error.message);
            }

        })
    if (data.st) {
        alert(data.msg);
    }
    return data;
}