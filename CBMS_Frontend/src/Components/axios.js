import axios from 'axios';
// import { useContext } from "react";
// import {AuthContext} from '../Context/AuthContext'

// const authContext = useContext(AuthContext);

const instance = axios.create({
  baseURL: 'http://localhost:4000/api'

});

// let user = localStorage.getItem('token');
// console.log("USER",user);
// const AUTH_TOKEN = user.data.id;
// console.log(AUTH_TOKEN);

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;
