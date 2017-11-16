import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "https://codercamps-conduit.herokuapp.com/api";

let token =null;
const tokenPlugin = req =>{
  if(token){
    req.set("Authoriization",`Token ${token}`);
  }
}

const responseBody = res => res.body;
// by enter isnt back ticks its by tab 
const requests = {
  get: url => 
  superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url,body) =>
  superagent.post(`${API_ROOT}${url}`,body).use(tokenPlugin).then(responseBody)
};

const Articles = {
  all: page => requests.get(`/articles?limit=10`)
};

const Auth = {
  current: () => requests.get("/user"),
    login: (email, password) =>
      requests.post("/users/login", { user: { email, password } }),
      register: (username, email, password) =>
      requests.post("/user", {user: { username, email, password } })
  };
  
export default {
  Articles,
  Auth,
  setToken: _token =>{
    token = _token;
  }
};
