import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useStateProvider } from "@/context/StateContext";
import Image from "next/image";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios";

import { GET_USER_INFO, HOST } from "../../utils/constants";
import { reducerCases } from "@/context/constants";
// import { useNavbarSearchStyle } from "./styles/useNavbarSearchStyle";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<any>("");
  // const classes = useNavbarSearchStyle();
  const [cookies] = useCookies();

  const [{ showLoginModal, showRegisterModal, userInfo, isAuthor }, dispatch] =
    useStateProvider();
  const router = useRouter();

  const pages = [
    { routeName: "Books", handler: "/" },
    { routeName: "Read Books", handler: "/books/read" },
    { routeName: "Saved Books", handler: "/books/saved" },
  ];

  const settings = [
    { routeName: "My Books", handler: "/books/my-books" },
    { routeName: "Account", handler: "/Account" },
    { routeName: "Logout", handler: "/" },
  ];

  const handleLogin = () => {
    if (showRegisterModal) {
      dispatch({
        type: reducerCases.TOGGLE_REGISTER_MODAL,
        showRegisterModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: true,
      });
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(
            GET_USER_INFO,
            {},
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${cookies.jwt}`,
              },
            }
          );
          let projectedUserInfo = { ...user };
          if (user.image) {
            projectedUserInfo = {
              ...projectedUserInfo,
              imageName: HOST + "/" + user.image,
            };
          }

          delete projectedUserInfo.image;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectedUserInfo,
          });

          setIsLoaded(true);
        } catch (error) {
          console.log("error", error);
        }
      };
      getUserInfo();
    }
  }, [cookies, userInfo, dispatch]);

  return (
    <>
      {isLoaded && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                onClick={() => router.push("/")}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ReadConnect
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map(({ routeName, handler }) => (
                    <MenuItem key={routeName} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => router.push(handler)}
                      >
                        {routeName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ReadConnect
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map(({ routeName, handler }) => (
                  <Button
                    key={routeName}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    href={handler}
                  >
                    {routeName}
                  </Button>
                ))}

                <form method="post">
                  <input
                    type="text"
                    className="textbox"
                    placeholder="Search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
                  />

                  <Button
                    title="Search"
                    type="submit"
                    className="button"
                    onClick={() => {
                      setSearchData("");
                      router.push(`/search?q=${searchData}`);
                    }}
                  >
                    Search
                  </Button>
                </form>
              </Box>

              <Box sx={{ flexGrow: 0, display: "flex" }}>
                {userInfo && (
                  <Button
                    onClick={() => router.push("/add-book")}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Add Book
                  </Button>
                )}

                {!userInfo ? (
                  <Button
                    onClick={handleLogin}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    Login
                  </Button>
                ) : (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {userInfo.imageName ? (
                        <Image
                          src={userInfo.imageName}
                          alt="Profile"
                          width={40}
                          height={40}
                          style={{
                            borderRadius: 70,
                          }}
                          className="rounded-full"
                        />
                      ) : (
                        <div
                          style={{
                            height: 50,
                            width: 50,
                            backgroundColor: "white",
                            borderRadius: 50,
                            padding: 10,
                          }}
                        >
                          {userInfo?.email &&
                            userInfo?.email.split("")[0].toUpperCase()}
                        </div>
                      )}
                    </IconButton>
                  </Tooltip>
                )}

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(({ routeName, handler }) => (
                    <MenuItem key={routeName} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => router.push(handler)}
                      >
                        {routeName}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
}
export default ResponsiveAppBar;
