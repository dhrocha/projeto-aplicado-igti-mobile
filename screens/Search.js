import React, { useState } from "react";
import {
  Button,
  Divider,
  Icon,
  IndexPath,
  Layout,
  List,
  ListItem,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { Linking, StyleSheet } from "react-native";

// import { StyleSheet, View } from "react-native";

const renderItemAccessory = (props) => (
  <Button
    size="tiny"
    onPress={() =>
      Linking.openURL("http://maps.apple.com/maps?daddr=38.7875851,-9.3906089")
    }
  >
    MAPA
  </Button>
);

const renderItemIcon = (props) => (
  <Icon {...props} name="checkmark-circle-outline" />
);

const renderItem = ({ item, index }) => (
  <ListItem
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={renderItemAccessory}
  />
);

export default function Search() {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const data = new Array(15).fill({
    title: "Restaurante XPTO",
    description: "Endereço",
  });

  // const [neighbor, setNeighbor] = useState("");

  return (
    <Layout
      level="1"
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Select
        label="Cidade"
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={{ width: "95%", margin: 10 }}
      >
        <SelectItem title="Option 1" />
        <SelectItem title="Option 2" />
        <SelectItem title="Option 3" />
      </Select>
      <Select
        label="Bairro"
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={{ width: "95%" }}
      >
        <SelectItem title="Option 1" />
        <SelectItem title="Option 2" />
        <SelectItem title="Option 3" />
      </Select>
      <List
        data={data}
        renderItem={renderItem}
        style={styles.container}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 550,
    width: "95%",
  },
});
