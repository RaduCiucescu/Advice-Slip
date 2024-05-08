import { X } from "@mui/icons-material";

export const getCurrentDateFormated = () => {

 

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
  
  
    return `${date}/${month}/${year} at ${hour}:${minute}`;
    }
  