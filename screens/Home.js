import { Layout } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, Text } from "react-native";

export default function Home() {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require("../images/logo.png")} />
      <Text style={styles.textContainer}>Bem vindo de volta, Daniel!</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 10,
    fontWeight: "bold",
  },
});
