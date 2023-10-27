import React, { FC, useState, useEffect } from "react";
import Page from "@/components/Page/Page";
import Books from "@/components/Books/Books";
import { useStateProvider } from "../context/StateContext";

import Auth from "@/components/Authentication/Auth/Auth";

const Index = () => {
  const [{ showLoginModal, showRegisterModal}] =
    useStateProvider();

  const handleOpen = () => showLoginModal || showRegisterModal;
  const handleClose = () => !showLoginModal || !showRegisterModal;

  console.log("showRegisterModal: ", showRegisterModal);
  console.log("showLoginModal: ", showLoginModal);
  return (
    <Page>
      <Books />
      {(showLoginModal || showRegisterModal) && (
        <Auth
          open={handleOpen}
          handleClose={handleClose}
          type={showLoginModal ? "login" : "register"}
        />
      )}
    </Page>
  );
};

export default Index;
