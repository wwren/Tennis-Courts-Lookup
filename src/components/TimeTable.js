import { Table, Tag } from "antd";
import "./TimeTable.css";

const columns = [
  {
    title: "Facility",
    dataIndex: "facilityName",
    key: "facilityName",
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

export function TimeTable({ locations }) {
  return (
    <>
      <Table dataSource={locations} columns={columns} pagination={false} />;
    </>
  );
}
