import axios from 'axios';
import { SomethingWrong } from '../constants/String';

const BASE_URL = 'https://covid19-ph-tracker-server.herokuapp.com/';
const COVID_API = 'api/covid/';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const CONTENT_TYPE_JSON = 'application/json';

const COVID_API_LATEST_STATS = 'country_latest_stats/';
const COVID_API_WORLD_STATS = 'world_stats';
const COVID_API_COUNTRY_HISTORY = 'country_history/';
const COVID_API_PH_LIST = 'ph_patient_list';

const REQUEST_SUCCESS = 200;

function axiosCallWrapper(url, callback, errorCallback){
    axios
        .get(url)
        .then((res) => {
            if(res.status === REQUEST_SUCCESS){
                if( callback != null ){
                    callback(res.data);
                }
            }else{
                if( errorCallback != null ){
                    errorCallback(SomethingWrong);
                }
            }
        })
        .catch(error => {
            if( errorCallback != null ){
                errorCallback(error);
            } 
        });
}

export const getLatestStatisticsByCountry = (key, callback, errorCallback) => { 
    const FULL_URL = BASE_URL + COVID_API + COVID_API_LATEST_STATS + key;
    axiosCallWrapper(FULL_URL, callback, errorCallback);
}

export const getWorldStats = (callback, errorCallback) => {
    const FULL_URL = BASE_URL + COVID_API + COVID_API_WORLD_STATS;
    axiosCallWrapper(FULL_URL, callback, errorCallback);
}

export const getHistoryByCountry = (key, callback, errorCallback) => {
    const FULL_URL = BASE_URL + COVID_API + COVID_API_COUNTRY_HISTORY + key;
    axiosCallWrapper(FULL_URL, callback, errorCallback);
}

export const getPatientList = (callback, errorCallback) => {
    const FULL_URL = BASE_URL + COVID_API + COVID_API_PH_LIST;
    axiosCallWrapper(FULL_URL, callback, errorCallback);
}