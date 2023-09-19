import NavBar from "./components/navigation/NavBar";
import {Task} from "@mui/icons-material";

const AppRoutes = [
  {
    index: true,
    path: "/",
    element: <NavBar />
  },
  {
    index: true,
    path: "tasks/:category",
    element: <Task />
  },
];

export default AppRoutes;
