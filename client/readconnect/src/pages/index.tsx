// import styles from "@/styles/Home.module.css";
import React, { FC, useState, useEffect } from "react";
import Page from "@/components/Page/Page";
import Books from "@/components/Books/Books";
import { useStateProvider } from "../context/StateContext";

import Auth from "@/components/Authentication/Auth/Auth";

const Index = () => {
  const [{ showLoginModal, showRegisterModal }] = useStateProvider();

  // const [open, setOpen] = useState(false);
  const handleOpen = () => showLoginModal || showRegisterModal //setOpen(true);
  const handleClose = () =>  !showLoginModal || !showRegisterModal //setOpen(false);


  console.log("showRegisterModal: ", showRegisterModal)
  return (
    <Page>
      <Books handleOpen={handleOpen} />
      {(showLoginModal || showRegisterModal) && (
        <Auth
          open={showLoginModal || showRegisterModal}
          handleClose={handleClose}
          type={showLoginModal ? "login" : "register"} 
        />
      )}
    </Page>
  );
};

export default Index;
