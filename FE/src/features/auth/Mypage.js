/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Mypage.css";
import backEndUrl from "../setup/hld_url";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

function Mypage() {
  const BEUrl = backEndUrl;
  const [profile, setProfile] = useState([]);
  const getProfile = () => {
    axios({
      url: `${BEUrl}/api/v1/users/me`,
      method: "get",
      headers: setToken(),
    }).then((res) => {
      setProfile(res.data);
    });
  };
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>마이페이지</h1>
      <Container>
        <div>ID: {profile.userId}</div>
        <div>닉네임: {profile.nickname}</div>
        <div>이메일: {profile.email}</div>
        <div>
          가입일: {dayjs(profile.createdAt).format("YYYY년 MM월 DD일 HH:mm")}
        </div>
      </Container>
      <Link to="/editProfile">
        <Button>내 정보 수정</Button>
      </Link>
    </div>
  );
}

export default Mypage;
