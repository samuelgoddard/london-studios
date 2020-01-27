import React from "react";
import Layout from "./src/components/layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = ({
  setPostBodyComponents,
}) => {
  setPostBodyComponents([
    <script src="https://unpkg.com/blotterjs-fork@0.1.0/build/blotter.min.js" async></script>,
  ])
}
