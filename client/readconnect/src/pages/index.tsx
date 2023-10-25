import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Page from "@/components/Page/Page";
import { Container } from "@mui/material"
import Books from "@/components/Books/Books";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Page>
      <Books />
    </Page>
  );
}
