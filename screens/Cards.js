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
  Spinner,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { API } from "../api/api";

const statusesList = [
  { id: 1, name: "Ativo" },
  { id: 2, name: "Disponível para Resgate" },
  { id: 3, name: "Resgatado" },
  { id: 4, name: "Cancelado" },
];

const FidelityCard = ({ item }) => {
  const { dates } = item;
  const totalSpots = 10;

  return (
    <ScrollView style={{ display: "flex", flexDirection: "column" }}>
      <Text>Detalhes do Cartão</Text>

      <View
        style={{
          minWidth: 300,
          borderRadius: 20,
          marginTop: 10,
          backgroundColor: "white",
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          display: "flex",
        }}
      >
        {[...Array(totalSpots)].map((i, j) => {
          return (
            <View
              key={Math.random()}
              style={{
                width: "47%",
                height: 100,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: `${dates[j] ? "green" : "red"}`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: 5,
              }}
            >
              <Text>Teste</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const ModalCard = ({ modalVisible, setModalVisible, item }) => {
  return (
    <Modal
      visible={modalVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setModalVisible(false)}
    >
      <Card disabled={true}>
        <FidelityCard {...{ item }} />
      </Card>
    </Modal>
  );
};

const renderItemAccessory = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { item } = props;

  return (
    <>
      <Button size="tiny" onPress={() => setModalVisible(true)}>
        Abrir
      </Button>
      <ModalCard {...{ modalVisible, setModalVisible, item }} />
    </>
  );
};

const renderItemIcon = (props) => (
  <Icon {...props} name="credit-card-outline" />
);

const renderItem = ({ item, index }) => (
  <ListItem
    title={`${item.placeData.title}`}
    description={`${item.placeData.description}`}
    accessoryLeft={renderItemIcon}
    accessoryRight={(props) => renderItemAccessory({ ...{ item }, ...props })}
  />
);

export default function Cards() {
  const [selectedStatus, setSelectedStatus] = useState(new IndexPath(0));
  const [statusValue, setStatusValue] = useState("");
  const [cardsList, setCardsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = async (statusId) => {
    setLoading(true);
    const cards = await API.get(`/cards?status=${statusId}`);

    const promises = cards?.data?.map(async (card) => {
      const place = await API.get(`/places/${card.place}`);
      return {
        placeData: place.data,
        ...card,
      };
    });

    const completeData = await Promise.all(promises);

    setCardsList(completeData);
    setLoading(false);
  };

  useEffect(() => {
    selectedStatus && setStatusValue(statusesList[selectedStatus.row]);
    fetchCards(statusesList[selectedStatus.row].id);
  }, [selectedStatus]);

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
        label="Status"
        selectedIndex={selectedStatus}
        onSelect={(index) => setSelectedStatus(index)}
        style={{ width: "95%", margin: 10 }}
        value={statusValue.name}
      >
        {statusesList?.map((status) => (
          <SelectItem
            title={status.name}
            value={status.id}
            key={Math.random()}
          />
        ))}
      </Select>
      {loading ? (
        <View style={styles.spinnerControl}>
          <Spinner />
        </View>
      ) : (
        <List
          data={cardsList}
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
  icon: {
    color: "green",
  },
  modalContainer: {
    minHeight: 300,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
