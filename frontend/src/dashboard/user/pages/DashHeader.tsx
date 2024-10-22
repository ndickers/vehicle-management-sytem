import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import userIcon from "../../../assets/user-icon.png";
import { useState } from "react";
import { logout } from "../../../features/login/userLoginSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;

  children: React.ReactElement;
}

export default function DashHeader(props: Props) {
  const userInfo = useSelector((state: RootState) => state.loginUser);
  const [toggleLogout, setToggleLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={"/dashboard/user"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F] "
            >
              view vehicles
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={"/dashboard/user/booked-vehicles"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              booked vehicles
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={"/dashboard/user/contact-support"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              contact support
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={"/dashboard/user/manage-support"}
              className="underline focus:text-[#BB8C5F] hover:text-[#BB8C5F]"
            >
              manage support
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "black",
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="w-[100%]">
            <div className="flex bg-black p-6 rounded-[1.5rem] justify-between items-center">
              <h2></h2>
              <div className="flex items-center gap-4">
                <p>{userInfo.user.fullname}</p>
                <div className="flex items-center gap-3 ">
                  {toggleLogout && (
                    <button
                      onClick={() => {
                        dispatch(logout());
                        toast.success("logged out");
                        navigate("/login/user");
                      }}
                      className="border hover:bg-white hover:text-black border-white bg-black px-2 rounded-md"
                    >
                      logout
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setToggleLogout((prevState) => !prevState);
                    }}
                    className="h-8 w-8 rounded-full bg-slate-200"
                  >
                    <img src={userIcon} alt="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },

          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
