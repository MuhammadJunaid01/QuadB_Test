import React, { useEffect, useState } from "react";
import { Container, Card, Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import "./detail.css";
const Detail = () => {
  const { id } = useParams();
  const [matcheData, setMatchedata] = useState({});
  const [loader, setLoader] = useState(true);
  const [check, setCheck] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setMatchedata(data.find((item) => item.show.id == id)))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  }, [id]);
  if (matcheData === undefined) {
    return;
  }
  const userInfo = {
    name,
    address,
    number,
    email,
  };
  const userDataSaved = () => {
    reactLocalStorage.setObject("userInfo", userInfo);
  };
  const handleBooking = () => {
    setCheck((prevCheck) => !prevCheck);
  };
  console.log(matcheData);
  const handleSubmit = (e) => {
    e.preventDefault();
    userDataSaved();
  };
  const handleClose = () => {
    setCheck((prevCheck) => !prevCheck);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const hadleNumber = (e) => {
    setNumber(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={1} lg={1}></Col>

          <Col xs={12} md={6} lg={6}>
            <Card>
              <Card.Img
                style={{ height: "250px" }}
                variant="top"
                src={matcheData?.show?.image?.medium}
              />
              <Card.Body className="taskDataCardBody">
                <Card.Title>{matcheData?.show?.name}</Card.Title>
                <Card.Text>{matcheData?.show?.summary}</Card.Text>
                <Button
                  onClick={handleBooking}
                  className="taskDataBtnn"
                  variant="dark"
                >
                  Booking Movei
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4} lg={4}>
            {check ? (
              <div></div>
            ) : (
              <>
                <span onClick={handleClose} className="closeIcon">
                  <i className="far fa-times-circle"></i>
                </span>
                <form onSubmit={handleSubmit}>
                  <input
                    required
                    type="text"
                    defaultValue={matcheData?.show?.name}
                    disabled
                  />
                  <input
                    required
                    onBlur={handleName}
                    type="text"
                    placeholder="Enter Your Name:"
                  />
                  <input
                    required
                    onBlur={handleAddress}
                    type="text"
                    placeholder="Enter Your Address:"
                  />
                  <input
                    required
                    onBlur={hadleNumber}
                    type="number"
                    placeholder="Enter Your Mobail Number:"
                    min={0}
                  />
                  <input
                    required
                    onBlur={handleEmail}
                    type="email"
                    placeholder="Enter Your Email:"
                  />
                  <input type="submit" value="Booking Ticket" />
                </form>
              </>
            )}
          </Col>

          <Col xs={12} md={1} lg={1}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detail;
