import { FC, useEffect, useState } from "react";
import { Grid } from "@/mui-components/Grid/Grid";
import colors from "@/utils/theme/base/colors";
import typography from "@/utils/theme/base/typography";
import { useParams } from "react-router-dom";
import SpanHeader from "./SpanHeader/SpanHeader";
import BookTitle from "./BookTitle/BookTitle";
import PublishDate from "./PublishDate/PublishDate";
import BookBody from "./BookBody/BodyBody";
import BookWrapper from "./BookWrapper/BookWrapper";
import BookContainer from "./BookContainer/BookContainer";
import BookImage from "./BookImage/BookImage";
import Page from "../../../components/Page/Page";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { GET_BOOK_DATA } from "@/utils/constants";

const image =
  "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/asher.jpg";

const BookDetails: FC = () => {
  const { blue, grey } = colors;
  const { h6 } = typography;

  const router = useRouter();
  const { bookId } = router.query;
  const [{ bookData, userInfo }, dispatch] = useStateProvider();
  const [data, setData] = useState({});

  // console.log("BOOKKK SINGKE222:", data.title)

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const {
          data: { book },
        } = await axios.get(`${GET_BOOK_DATA}/${bookId}`);
        dispatch({ type: reducerCases.GET_BOOK_DATA, bookData: book });

        // setData({...book});

        // gig.images.forEach((image) => {
        //   const url = "http://localhost:8747/uploads/" + image;
        //   const fileName = image;
        //   fetch(url).then(async (response) => {
        //     const contentType = response.headers.get("content-type");
        //     const blob = await response.blob();
        //     const files = new File([blob], fileName, { contentType });
        //     setFile([files]);
        //   });
        // });
      } catch (err) {
        console.log(err);
      }
    };
    if (bookId) fetchBookData();
  }, [bookId]);

  return (
    <Page
      // @ts-ignore
      key={bookId}
    >
      <BookWrapper>
        <BookContainer>
          <BookTitle />
          <BookImage image={image} />
          <Grid container textAlign="left">
            <SpanHeader
              textTransform="capitalize"
              fontSize={h6}
              color={blue.main}
              textColor={grey["500"]}
            />
          </Grid>
          <Grid container textAlign="left" mt={-4}>
            <PublishDate />
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <BookBody />
          </Grid>
        </BookContainer>
      </BookWrapper>
    </Page>
  );
};

export default BookDetails;
