import React from "react";
import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import Footer from "../src/components/Layout/Footer";
import FaqContent from "../src/components/FAQ/FaqContent";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Frequently Asked Questions",
  description:
    "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
  openGraph: {
    title: "TradeTrust - Frequently Asked Questions",
    description:
      "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
    url: `${URL}/faq`
  }
};

const FaqPage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="faq" />
    <FaqContent />
    <Footer />
  </>
);

export default connect()(FaqPage);
