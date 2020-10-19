import axios from "axios";

export default axios.create({
  baseURL: "http://asak.azurewebsites.net/api/techplan",
  headers: {
    "Content-type": "application/json",
    
  }
});