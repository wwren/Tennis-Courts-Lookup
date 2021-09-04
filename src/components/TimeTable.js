import { Table, Tag } from "antd";
import "./TimeTable.css";

const columns = [
  {
    title: "Facility",
    dataIndex: "facilityName",
    key: "facilityName",
    render: (records) => {
      let link = records.split("_")[1];
      let name = records.split("_")[0];
      return (
        <a href={link} target="_blank" rel="noreferrer">
          {name}
        </a>
      );
    },
  },
  {
    title: "Available Slots",
    dataIndex: "availableSlot",
    key: "availableSlot",
    render: (records) => (
      <>
        {records.length > 0 ? (
          records.map((r) => {
            return (
              <Tag color="green" key={r}>
                {r}
              </Tag>
            );
          })
        ) : (
          <Tag color="volcano"> None available</Tag>
        )}
      </>
    ),
  },
];

export function TimeTable({ locations, isLoading }) {
  return (
    <>
      <Table
        style={{ paddingBottom: "80px" }}
        dataSource={locations}
        columns={columns}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
}
