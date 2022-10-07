import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";

const statusesList = [
  { id: 1, name: "Ativo" },
  { id: 2, name: "Resgatado" },
  { id: 3, name: "Cancelado" },
];

export default function Cards() {
  const [selectedStatus, setSelectedStatus] = useState(new IndexPath(0));
  const [statusValue, setStatusValue] = useState("");

  useEffect(() => {
    selectedStatus && setStatusValue(statusesList[selectedStatus.row]);
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
    </Layout>
  );
}
