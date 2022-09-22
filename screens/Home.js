import { Layout } from "@ui-kitten/components";
import React from "react";
import { Image } from "react-native";

export default function Home() {
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={require("../images/logo.png")} />
    </Layout>
  );
}
