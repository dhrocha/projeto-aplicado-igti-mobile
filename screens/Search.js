import React, { useEffect, useState } from "react";
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
  ViewPager,
} from "@ui-kitten/components";
import { FlatList, Linking, ScrollView, StyleSheet, Text } from "react-native";
import axios from "axios";

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
    title={`${item.title}`}
    description={`${item.description}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={renderItemAccessory}
  />
);

export default function Search() {
  const [selectedCity, setSelectedCity] = React.useState("");
  const [selectedNeighbor, setSelectedNeighbor] = React.useState("");
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [neighborValue, setNeighborValue] = useState("");
  const [listData, setListData] = useState([]);

  const loadCities = async () => {
    const { data } = await axios.get("http://localhost:3000/cities");
    setCities(data);
  };

  const loadNeighbors = async () => {
    const { data } = await axios.get("http://localhost:3000/neighborhoods");
    setNeighborhoods(data);
  };

  const loadPlaces = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/places?city=${cityValue.id}&neighborhood=${neighborValue.id}`
    );
    console.log(data);
    setListData(data);
  };

  useEffect(() => {
    loadCities();
    loadNeighbors();
  }, []);

  useEffect(() => {
    selectedCity && setCityValue(cities[selectedCity.row]);
    selectedNeighbor && setNeighborValue(neighborhoods[selectedNeighbor.row]);

    if (selectedCity && selectedNeighbor) {
      loadPlaces();
    }
  }, [selectedCity, selectedNeighbor]);

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
        selectedIndex={selectedCity}
        onSelect={(index) => setSelectedCity(index)}
        style={{ width: "95%", margin: 10 }}
        value={cityValue.name}
      >
        {cities?.map((city) => (
          <SelectItem title={city.name} value={city.id} key={Math.random()} />
        ))}
      </Select>
      <Select
        label="Bairro"
        selectedIndex={selectedNeighbor}
        onSelect={(index) => setSelectedNeighbor(index)}
        style={{ width: "95%" }}
        value={neighborValue.name}
      >
        {neighborhoods?.map((n) => (
          <SelectItem title={n.name} value={n.id} key={Math.random()} />
        ))}
      </Select>
      <List
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        style={styles.container}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 550,
    width: "95%",
    marginTop: 15,
  },
});
