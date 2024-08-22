import axios from "axios";

const BaseUrl = "https://api.sheety.co/af35b536915ec576818d468cf2a6505c/reactjsTest"

const instance = axios.create({
    baseURL: BaseUrl,
});

instance.interceptors.request.use(async config => {
    try {
        config.headers.Authorization = " Bearer Ex9yLyRU7wvyxfblpq5HAhfQqUP1vIyo";
    } catch (err) {
        console.log(err?.message);
    }
    return config
},
    (error) => {
        return Promise.reject(error);
    }
);

export const fetchProduct = async () => {
    return await instance.get("/products")
}

export const fetchProductFilterColor = async () => {
    return await instance.get("/colors")
}

export const fetchProductFilterMaterial = async () => {
    return await instance.get("/material")
}