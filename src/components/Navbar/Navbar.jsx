import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";

import {
  AppBar,
  Toolbar,
  Button,
  Drawer,
  useMediaQuery,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { AccountCircle, Menu, Close } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";
import { fetchToken, createSessionId, moviesApi } from "../../utils";

import { Sidebar, Search } from "..";

const Navbar = () => {
  const drawerWidth = 240;

  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { pathname } = useLocation();

  const dispacth = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);

  const token = localStorage.getItem("request_token");
  const sessionIDFromLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIDFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIDFromLocalStorage}`
          );
          dispacth(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispacth(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  return (
    <Fragment>
      <AppBar
        sx={{
          bgcolor: "hsl(267, 17%, 10%)",
        }}
        position="sticky"
      >
        <Toolbar className="toolbar-container">
          {isMobile && (
            <IconButton
              color="inherit"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              {mobileOpen ? (
                <Close sx={{ width: "30px", height: "30px" }} />
              ) : (
                <Menu sx={{ width: "30px", height: "30px" }} />
              )}
            </IconButton>
          )}
          {pathname === "/" ? (
            <Search />
          ) : (
            <Typography
              variant="h4"
              component="h2"
              sx={{ color: "hsl(358, 83%, 51%)" }}
            >
              FLICKS
            </Typography>
          )}
          <div>
            {!isAuthenticated ? (
              <Button className="login-btn" onClick={fetchToken}>
                Login&nbsp; <AccountCircle className="account-circle" />
              </Button>
            ) : (
              <Button
                className="login-btn"
                component={Link}
                to={`/profile/${user.id}`}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div>
        <nav>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  backgroundColor: "hsl(267, 17%, 10%)",
                },
              }}
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  backgroundColor: "hsl(267, 17%, 10%)",
                },
              }}
              variant="permanent"
              className="drawer-container"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </Fragment>
  );
};

export default Navbar;
