import { FC } from "react";
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

const image =
  "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/asher.jpg";

const temporaryArticle = {
  id: 1,
  title: "The Buy By the Sea yes for the first time",
  body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  writer: "Sam Puffy Bark",
  date: "Jully 5, 2023",
  photo: image,
  reply: 4,
  like: 0,
  views: 435,
  channel: "Politik",
};

const SingleArticle: FC = () => {
  const { blue, grey } = colors;
  const { h6, h5 } = typography;
  const { id } = useParams();
  const publishDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Page key={id}>
      <BookWrapper>
        <BookContainer>
          <BookTitle
            title="When activated, Tooltips display a text label identifying an
                element, such as a description of its function."
          />
          <Grid item xs={12} sm={12} md={18} lg={12}>
            <SpanHeader
              textTransform="uppercase"
              fontSize={h5}
              color={blue.main}
              title={temporaryArticle.channel}
              mb={-1}
            />
          </Grid>

          <BookImage image={image} />
          <Grid container textAlign="left">
            <SpanHeader
              textTransform="capitalize"
              fontSize={h6}
              color={blue.main}
              textColor={grey["500"]}
              title="Oprah Winfrey is one of America's most famous TV personalities"
            />
          </Grid>
          <Grid container textAlign="left" mt={-4}>
            <PublishDate date={publishDate} author={"ALrnoed Lolo"} />
          </Grid>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <BookBody>
              Jamie Foxx has revealed an intervention from US talk show queen
              Oprah Winfrey helped him get his life back on track. <br /> <br />
              The actor told DJ Howard Stern that Winfrey had rebuked his
              "gallivanting" and had told him he was "blowing it". <br /> <br />
              Winfrey, Foxx went on, also arranged a meeting with Sidney Poitier
              "to make me understand the significance" of being nominated for an
              Academy Award. <br /> <br />
              The meeting took place one week before the 2005 Oscars, where Foxx
              won best actor for playing Ray Charles in Ray. <br /> <br />
              Foxx, who was also nominated that year for the best supporting
              actor Oscar, went on to star in Quentin Tarantino's western Django
              Unchained. <br /> <br />
              "You know me, I was going hard," the 49-year-old told Stern this
              week during an appearance on the latter's radio show. "I'm having
              such a good time, and I'm not knowing I'm [expletive] up. I'm
              drinking, I'm doing every [expletive] thing you can possibly
              imagine." "That's not what you want to do," Foxx recalled Winfrey
              telling him in an unexpected phone call. "I want to take you
              somewhere." This led to a visit to Quincy Jones's house, where he
              was told by the legendary producer: "You're doing good, man, we
              just don't want you to blow it, baby." Winfrey, Foxx went on, also
              arranged a meeting with Sidney Poitier "to make me understand the
              significance" of being nominated for an Academy Award. <br />{" "}
              <br />
              The meeting took place one week before the 2005 Oscars, where Foxx
              won best actor for playing Ray Charles in Ray. <br /> <br />
              Foxx, who was also nominated that year for the best supporting
              actor Oscar, went on to star in Quentin Tarantino's western Django
              Unchained. <br /> <br />
              "You know me, I was going hard," the 49-year-old told Stern this
              week during an appearance on the latter's radio show. "I'm having
              such a good time, and I'm not knowing I'm [expletive] up. I'm
              drinking, I'm doing every [expletive] thing you can possibly
              imagine." "That's not what you want to do," Foxx recalled Winfrey
              telling him in an unexpected phone call. "I want to take you
              somewhere." This led to a visit to Quincy Jones's house, where he
              was told by the legendary producer: "You're doing good, man, we
              just don't want you to blow it, baby."
            </BookBody>
          </Grid>
        </BookContainer>
      </BookWrapper>
    </Page>
  );
};

export default SingleArticle;
