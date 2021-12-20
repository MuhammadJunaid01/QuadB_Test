import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";
const Home = () => {
  const [taskData, setTaskData] = useState([]);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setTaskData(data));
  }, []);
  console.log("task data", taskData);

  //   console.log();
  return (
    <div className="homeContainer" style={{ marginTop: "40px" }}>
      <Container>
        <Row className="gy-3">
          {taskData?.map((data, index) => (
            <Col key={index} xs={12} md={4} lg={4}>
              <Card>
                <Card.Img
                  className="taskDataCardImage"
                  variant="top"
                  src={data?.show.image?.medium}
                />
                <Card.Body className="taskDataCardBody">
                  <Card.Title>{data.show.name}</Card.Title>
                  <Card.Text>{data?.show.summary.slice(0, 100)}</Card.Text>
                  <Link to={`/detailInfo/${data.show.id}`}>
                    <Button variant="dark" className="taskDataBtnn">
                      View Detail
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
