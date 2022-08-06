import axios from "axios";
import qs from "qs";
import { CANCEL } from "redux-saga";
import { optionsError } from "./toast.service";
import { store } from "../../store/store";
import * as constants from "../../store/constants/authenticate";
import CONFIG from "config/common.config";
import { AUTH_TOKEN } from "helpers/common.constants";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const CancelToken = axios.CancelToken;

let apiUrl = CONFIG.BASE_URL;

const api = axios.create({
  // withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  },
});

const tokenStored =
  localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN) || "";
setHeaderToken(tokenStored);

export function setHeaderToken(token) {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
}

// Implement request cancel
export function get(url, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .get(url, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function getParams(url, params = null) {
  return api
    .get(url, {
      params: params,
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

// tslint:disable-next-line:no-any
function post(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .post(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
function put(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .put(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
export function patch(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .patch(url, body, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
export function patchPassword(url, body, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .patch(url, body, defaultConfig)
    .then(() => {
      return "Succes";
    })
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

function _delete(url, config = {}) {
  let cancel;
  const defaultConfig = {
    ...config,
    cancelToken: new CancelToken((c) => (cancel = c)),
  };
  const request = api
    .delete(url, defaultConfig)
    .then(mapData)
    .catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

export function postFormData(url, body) {
  const formData = new FormData();
  Object.keys(body).forEach((key) => {
    formData.append(key, body[key]);
  });
  return api
    .post(url, formData, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then(mapData)
    .catch(mapErrorCallAPI);
}

export function createData(url, data, config = {}) {
  let cancel;
  // const defaultConfig = {
  //   ...config,
  //   cancelToken: new CancelToken((c) => (cancel = c)),
  // };
  const request = api.post(url, data).then(mapData).catch(mapErrorCallAPI);
  request[CANCEL] = () => cancel();
  return request;
}

// tslint:disable-next-line:no-any
export function sendWithFile(url, method, bodyData, files) {
  method = method.toLowerCase();
  let formData = new FormData();
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      for (let j = 0; j < files[i].files.length; j++) {
        formData.append(
          files[i].name,
          files[i].files[j],
          // tslint:disable-next-line:align
          files[i].files[j] ? files[i].files[j].name : "__upload_file"
        );
      }
    }
  }
  for (let property of Object.keys(bodyData)) {
    appendRecursive(formData, bodyData[property], property);
  }
  const config = {
    onUploadProgress: (progressEvent) => {
      // let percentCompleted = Math.round(
      //   (progressEvent.loaded * 100) / progressEvent.total
      // );
    },
    headers: { "content-type": "multipart/form-data" },
  };
  return axios[method](`${apiUrl}${url}`, formData, config)
    .then(mapData)
    .catch(mapErrorCallAPI);
}

// tslint:disable-next-line:no-any
function appendRecursive(fData, data, prop) {
  if ("object" === typeof data) {
    for (let p of data) {
      appendRecursive(fData, data[p], `${prop}`);
    }
  } else {
    fData.append(prop, data);
  }
}

function mapData(res) {
  return res.data;
}

// function mapError(err) {
//   if (
//     (err.response && err.response.status === 401) ||
//     err.response.status === 500
//   ) {
//     toastError("Có lỗi xảy ra, vui lòng thử lại sau");
//     store.dispatch({ type: constants.LOGOUT });
//   }
// }

function mapErrorCallAPI(err) {
  const token = jwt_decode(localStorage.getItem(AUTH_TOKEN));
  if (err) {
    if (new Date(token?.exp) < new Date()) {
      store.dispatch({ type: constants.LOGOUT });
    }
    toast("Có lỗi xảy ra, vui lòng thử lại sau", optionsError);
  }
  throw err;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get,
  getParams,
  post,
  postFormData,
  patch,
  put,
  _delete,
  sendWithFile,
};
