import { Badge, Calendar, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";

function StaffShift() {
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
      console.log(Number(month));
      console.log(value.month());

      const type = {
        PENDING: "warning",
        ACTIVE: "success",
        REJECT: "error",
      };

      if (
        Number(date) === value.date() &&
        Number(month) === value.month() + 1
      ) {
        console.log(item.status);
        listData.push({
          type: type[item.status] ?? "error",
          content: "Đăng kí ca thành công!",
        });
      }
    });

    return listData || [];
  };
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
    console.log(response);
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
    const response = await api.get(`shift?staffId=${account.id}`);
    setLoading(false);
    setShifts(response.data);
  };

  useEffect(() => {
    fetchShift();
  }, []);

  if (loading) return <Spin />;

  return (
    <div>
      <Calendar
        cellRender={cellRender}
        onSelect={onSelect}
        onPanelChange={(value) => console.log(value)}
        disabledDate={disabledDate}
      />

      <Modal
        title="Shift"
        open={selectDate}
        onCancel={() => setSelectDate(null)}
        onOk={handleCreateShift}
      >
        <p>
          Bạn có muốn đăng kí ca làm cho <strong>{selectDate}</strong>
        </p>
      </Modal>
    </div>
  );
}

export default StaffShift;
