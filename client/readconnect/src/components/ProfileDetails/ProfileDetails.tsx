/* eslint-disable @next/next/no-img-element */
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Typography } from "@/mui-components/Typography/Typography";
import typography from "../../utils/theme/base/typography";
import colors from "../../utils/theme/base/colors";
import { Grid } from "@/mui-components/Grid/Grid";
import { Box } from "@/mui-components/Box/Box";
import Image from "next/image";
import { Container } from "@/mui-components/Container/Container";
import Avatar from "@mui/material/Avatar/Avatar";
import { TextField } from "@/mui-components/TextField/TextField";
import { Button } from "@/mui-components/Button/Button";
import { HOST, SET_USER_IMAGE, SET_USER_INFO } from "@/utils/constants";
import axios from "axios";
import { reducerCases } from "@/context/constants";

const ProfileDetails = () => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageHover, setImageHover] = useState(false);
  const [image, setImage] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    description: "",
  });

  const [{ showLoginModal, showRegisterModal, userInfo, isAuthor }, dispatch] =
    useStateProvider();

  const { h6, h4, size } = typography;
  const { green, error } = colors;

  const placeholderImageUrl =
    "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg";

  useEffect(() => {
    if (!userInfo) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: true,
      });
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    // Populate the user info if already present
    const handleData = { ...data };
    if (userInfo) {
      if (userInfo?.username) handleData.userName = userInfo?.username;
      if (userInfo?.description) handleData.description = userInfo?.description;
      if (userInfo?.fullName) handleData.fullName = userInfo?.fullName;

      if (userInfo?.imageName) {
        const fileName = image;
        fetch(userInfo.imageName).then(async (response) => {
          const contentType = response.headers.get("content-type");
          const blob = await response.blob();
          // @ts-ignore
          const files = new File([blob], fileName, { contentType });
          // @ts-ignore
          setImage(files);
        });
      }
      setData(handleData);
      setIsLoaded(true);
    }
  }, [userInfo]);


  const fileInputRef = React.createRef<HTMLInputElement>();

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

    const handleFile = (e: any) => {
      let file = e.target.files;
      const fileType = file[0]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setImage(file[0]);
      }
    };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setProfile = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        SET_USER_INFO,
        { ...data },
        { withCredentials: true }
      );
      if (response.data.userNameError) {
        setErrorMessage("Enter a Unique Username");
      } else {
        let imageName = "";
        if (image) {
          const formData = new FormData();
          formData.append("images", image);
          const {
            data: { img },
            
          } = await axios.post(SET_USER_IMAGE, formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          imageName = img;
        }

        dispatch({
          type: reducerCases.SET_USER,
          userInfo: {
            ...userInfo,
            ...data,
            image: imageName.length ? HOST + "/" + imageName : false,
          },
        });
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {isLoaded && (
        <>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Typography align="center" gutterBottom mt={10} fontSize={h4}>
                Complete your profile to begin
              </Typography>
              {errorMessage && (
                <Typography
                  align="center"
                  gutterBottom
                  fontSize={h6}
                  color={error.focus}
                >
                  {errorMessage}
                </Typography>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              <Grid
                container
                className={`viewImage ${
                  imageHover ? "opacity100" : "opacity0"
                }`}
              >
                <Grid container alignItems={"center"}>
                  <Box
                    sx={{
                      marginTop: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Grid>
                      <input
                        type="file"
                        accept="image/gif, image/jpeg, image/png"
                        onChange={handleFile}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        multiple={true}
                        name="profileImage"
                      />
                      <Button onClick={openFilePicker}>
                        {image ? "Modify Image" : "Choose File"}
                      </Button>
                      {image ? (
                        <div>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Selected Image"
                            style={{
                              maxWidth: 100,
                              maxHeight: 100,
                              borderRadius: 70,
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={placeholderImageUrl}
                            alt="Placeholder"
                            style={{
                              maxWidth: 100,
                              maxHeight: 100,
                              borderRadius: 70,
                            }}
                          />
                        </div>
                      )}
                    </Grid>

                    <Box component="form" sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
                            autoComplete="userName"
                            autoFocus
                            onChange={handleChange}
                            value={data.userName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            autoComplete="fullName"
                            autoFocus
                            onChange={handleChange}
                            value={data.fullName}
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                        multiline
                        rows={4}
                        onChange={handleChange}
                        value={data.description}
                      />

                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
                        onClick={setProfile}
                      >
                        Set Profile
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProfileDetails;
