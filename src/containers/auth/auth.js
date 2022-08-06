import http from "helpers/http";

export const login = (data) => async (dispatch, getState) => {
  try {
    const result = await http.post("login", data);

    return result;
  } catch (err) {
    throw err;
  }
};

export const register = (data) => async (dispatch, getState) => {
  try {
    const result = await http.post("register", data);

    return result;
  } catch (err) {
    throw err;
  }
};
