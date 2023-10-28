import React, { FC, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { Typography } from "@/mui-components/Typography/Typography";
import typography from "../../../utils/theme/base/typography";
import colors from "../../../utils/theme/base/colors";
import { Grid } from "@/mui-components/Grid/Grid";
import { Box } from "@/mui-components/Box/Box";
import { Container } from "@/mui-components/Container/Container";
import { TextField } from "@/mui-components/TextField/TextField";
import { Button } from "@/mui-components/Button/Button";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import BookImageUpload from "../BookImageUpload/BookImageUpload";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { ADD_BOOK_ROUTE, EDIT_BOOK_ROUTE, GET_BOOK_DATA, HOST } from "@/utils/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const categories = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const authors = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const BookEdit: FC = () => {
  const [files, setFile] = useState([]);
  const [cookies] = useCookies();
  const router = useRouter();

  const { bookId } = router.query;
  const [data, setData] = useState({
    title: "",
    categories: [],
    isbn: "",
    shortDescription: "",
    longDescription: "",
    pageCount: 0,
    publishedDate: "",
    authors: [],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Check if the name is "pageCount" and parse the value as an integer
    if (name === "pageCount") {
      setData({ ...data, [name]: parseInt(value, 10) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const editBook = async (event: any) => {
    event.preventDefault();
    const {
      title,
      categories,
      isbn,
      shortDescription,
      longDescription,
      pageCount,
      authors,
    } = data;
  
    if (
      title &&
      categories.length &&
      isbn &&
      shortDescription.length &&
      longDescription &&
      pageCount > 0 &&
      authors.length
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("thumbnailUrl", file));
      const booksData = {
        title,
        categories,
        isbn,
        shortDescription,
        longDescription,
        pageCount,
        authors,
      };
      //@ts-ignore
      const response = await axios.put( `${EDIT_BOOK_ROUTE}/${data.id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.jwt}`,
        },

        params: booksData,
      });

      console.log("EDIT_BOOK_ROUTE: ", EDIT_BOOK_ROUTE)
     
      if (response.status === 200) {
        router.push("/books/my-books");
      }
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const {
          data: { book },
        } = await axios.get(`${GET_BOOK_DATA}/${bookId}`);

        setData({ ...book, time: book.revisions });
       console.log('book: ', book);

        book.thumbnailUrl.forEach((image: any) => {
          const url = HOST + "/uploads" + image;
          const fileName = image;
          fetch(url).then(async (response) => {
            const contentType = response.headers.get("content-type");
            const blob = await response.blob();
            // @ts-ignore
            const files = new File([blob], fileName, { contentType });
            // @ts-ignore
            setFile(files);
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (bookId) fetchBookData();
  }, [bookId])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Book
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete={data.title}
                autoFocus
                size="small"
                onChange={handleChange}
                value={data.title}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="pageCount"
                label="Page Count"
                // @ts-ignore
                name="pageCount"
                autoFocus
                size="small"
                type="number"
                value={data.pageCount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Categories
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  fullWidth
                  name="categories"
                  value={data.categories}
                  size="small"
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                      },
                    },
                  }}
                >
                  {categories.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="isbn"
                label="ISBN"
                name="isbn"
                autoComplete={data.isbn}
                autoFocus
                size="small"
                onChange={handleChange}
                value={data.isbn}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Authors</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  fullWidth
                  name="authors"
                  value={data.authors}
                  size="small"
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                      },
                    },
                  }}
                >
                  {authors.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="shortDescription"
                label="Short Description"
                name="shortDescription"
                autoComplete="description"
                autoFocus
                multiline
                rows={3}
                onChange={handleChange}
                value={data.shortDescription}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="longDescription"
                label="long Description"
                name="longDescription"
                autoComplete="description"
                autoFocus
                multiline
                rows={3}
                onChange={handleChange}
                value={data.longDescription}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography className={""}>Books Images</Typography>
                <div>
                  <BookImageUpload files={files} setFile={setFile} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
                onClick={editBook}
              >
                Update Book
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default BookEdit;
