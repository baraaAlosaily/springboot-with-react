import "./App.css";
import { getAllStudent } from "./Client";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "./Container";
import { Avatar, Spin, Table, Modal, Empty } from "antd";
import Footer from "./Footer";
import AddStudentForm from "./forms/AddStudentForm";
import { errorNotificationWith } from "./Notification";

function App() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getAll=()=>getAllStudent()
  .then((res) =>
    res.json().then((students) => {
      setStudents(students);
      setIsFetching(false);
    })
  )
  .catch((e) => {
    console.log(e.error);
    errorNotificationWith(e.error.httpStatus, e.error.massage);
    setIsFetching(false);
  });

  useEffect(() => {
    setIsFetching(true);
    getAll();
  }, []);

  const columns = [
    {
      title: "",
      key: "avatar",
      render: (text, student) => (
        <Avatar size="large">
          {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
            .charAt(0)
            .toUpperCase()}`}
        </Avatar>
      ),
    },
    {
      title: "Student Id",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  let condition = () => {
    if (students.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  const commomElemnet = () => (
    <div>
      <Modal
        title="Add New Student"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddStudentForm onSuccess={handleCancel}
        onFailure={(err)=>{
          console.log(JSON.stringify(err.error.massage));
          errorNotificationWith(err.response.statusText,err.error.massage)
        }}
        getAll={getAll}
        />
      </Modal>

      <Footer
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        numberOfStudents={students.length}
      ></Footer>
    </div>
  );

  return (
    <div>
      {isFetching && (
        <Container>
          <Spin />
        </Container>
      )}
      {console.log(students)}
      {condition() ? (
        <Container>
          <Table
            style={{ marginBottom: "100px" }}
            pagination={false}
            dataSource={students}
            columns={columns}
            rowKey="studentId"
          />
          {commomElemnet()}
        </Container>
      ) : (
        <Container>
        <Empty description={<h1>No students exists</h1>} />
        {
          commomElemnet()
        }
        </Container>
      )}
    </div>
  );
}

export default App;
