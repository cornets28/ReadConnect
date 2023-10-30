import React, { FC } from "react";
import MyBooks from "@/components/Books/Books/MyBooks";
import Page from '@/components/Page/Page';
import axios from "axios";
import { GET_USER_BOOKS_ROUTE } from "@/utils/constants";

const Create: FC = () => {
    


  return (
    <Page>
      <MyBooks />
    </Page>
  )
}

export default Create;
