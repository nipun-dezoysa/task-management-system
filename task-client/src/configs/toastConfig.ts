import { Bounce, type ToastPosition } from "react-toastify";

export const toastConfig = {
  position: "top-center" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};
