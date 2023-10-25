import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Page from "../components/Page/Page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Page>
      <h1>Hello...</h1>
    </Page>
  );
}
