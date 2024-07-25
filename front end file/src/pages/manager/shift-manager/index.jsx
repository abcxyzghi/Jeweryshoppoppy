import { Badge, Button, Calendar, Modal, Space, Spin, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

function ManagerShift() {
  const [selectDate, setSelectDate] = useState();
  const account = useSelector((store) => store.user);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const getListData = (value) => {
    let listData = []; // Specify the type of listData

    shifts.forEach((item) => {
      const date = moment(item.fromTime).format("DD");
      const month = moment(item.fromTime).format("MM");

      const type = {
        PENDING: "warning",
        ACTIVE: "success",
        REJECT: "error",
      };

      if (
        Number(date) === value.date() &&
        Number(month) === value.month() + 1 &&
        item.staff
      ) {
        listData.push({
          type: type[item.status] ?? "error",
          content: item?.staff?.fullName,
        });
      }
    });

    return listData || [];
  };

  function isSameDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Compare year, month, and day of the month
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onSelect = (newValue) => {
    setSelectDate(newValue?.format("YYYY-MM-DD"));
  };

  const handleCreateShift = async () => {
    const response = await api.post("/shift", {
      staffId: account.id,
      from: `${selectDate}T08:30:00.000Z`,
      to: `${selectDate}T18:00:00.000Z`,
      status: "PENDING",
    });
    fetchShift();
    setSelectDate(null);
    toast.success("Đăng kí ca thành công!");
  };

  const disabledDate = (current) => {
    // Can not select days before today or today
    const today = new Date().setHours(0, 0, 0, 0);
    return current && current < today + 86400000; // 86400000 ms in a day
  };

  const fetchShift = async () => {
    setLoading(true);
    const response = await api.get(`shift?staffId=0`);
    setLoading(false);
    setShifts(response.data);
  };

  useEffect(() => {
    fetchShift();
  }, []);

  if (loading) return <Spin />;

  const columns = [
    {
      title: "Staff",
      dataIndex: "staff",
      key: "staff",
      render: (staff) => (staff ? staff.fullName : "None"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "PENDING" ? "orange" : "blue"}>
          {status || "None"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "id",
      render: (text, record) =>
        record.status === "PENDING" && (
          <Space size="middle">
            <Button
              type="primary"
              onClick={async () => {
                await api.post(`shift/${record.id}?status=ACTIVE`);
                fetchShift();
                toast.success("Đã duyệt ca");
              }}
            >
              Approve
            </Button>
            <Button
              type="primary"
              danger
              onClick={async () => {
                await api.post(`shift/${record.id}?status=REJECT`);
                fetchShift();
                toast.success("Đã huỷ ca");
              }}
            >
              Reject
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div>
      <Calendar
        cellRender={cellRender}
        onSelect={onSelect}
        disabledDate={disabledDate}
      />

      <Modal
        width={1000}
        title="Shift"
        open={selectDate}
        onCancel={() => setSelectDate(null)}
        onOk={handleCreateShift}
      >
        Duyệt đăng kí ca ngày {selectDate}
        <Table
          columns={columns}
          dataSource={shifts.filter((item) =>
            isSameDate(item.fromTime, new Date(selectDate))
          )}
        />
      </Modal>
    </div>
  );
}

export default ManagerShift;
