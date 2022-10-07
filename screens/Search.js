import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Select,
  SelectItem,
  Spinner,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import openMap from "react-native-open-maps";
import { API } from "../api/api";

const renderItemAccessory = (props) => {
  const { item } = props;
  const coordinates = item.coordinates.split(",");

  const goToPlace = () => {
    openMap({
      latitude: Number(coordinates[0]),
      longitude: Number(coordinates[1]),
      zoom: 30,
    });
  };

  return (
    <Button size="tiny" onPress={goToPlace}>
      MAPA
    </Button>
  );
};

const renderItemIcon = (props) => <Icon {...props} name="pin-outline" />;

const renderItem = ({ item, index }) => (
  <ListItem
    title={`${item.title}`}
    description={`${item.description}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={(props) => renderItemAccessory({ ...{ item }, ...props })}
  />
);

export default function Search() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighbor, setSelectedNeighbor] = useState("");
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cityValue, setCityValue] = useState("");
  const [neighborValue, setNeighborValue] = useState("");
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCities = async () => {
    const { data } = await API.get("/cities");
    setCities(data);
  };

  const loadNeighbors = async () => {
    const { data } = await API.get("/neighborhoods");
    setNeighborhoods(data);
  };

  useEffect(() => {
    loadCities();
    loadNeighbors();
  }, []);

  const loadPlaces = async (city, neighbor) => {
    setLoading(true);

    const { data } = await API.get(
      `/places?city=${city.id}&neighborhood=${neighbor.id}`
    );
    setListData(data);
    setLoading(false);
  };

  useEffect(() => {
    selectedCity && setCityValue(cities[selectedCity.row]);
    selectedNeighbor && setNeighborValue(neighborhoods[selectedNeighbor.row]);

    if (selectedCity && selectedNeighbor) {
      loadPlaces(cities[selectedCity.row], neighborhoods[selectedNeighbor.row]);
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
      {loading ? (
        <View style={styles.spinnerControl}>
          <Spinner />
        </View>
      ) : (
        <List
          data={listData}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={styles.container}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 550,
    width: "95%",
    marginTop: 15,
  },
  spinnerControl: {
    marginTop: 20,
  },
});
