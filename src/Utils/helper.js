import { toast } from "react-toastify";

export const errorHandler = (err, message) => {
  if (err) {
    toast.error(err);
  } else {
    toast.error(message);
  }
};