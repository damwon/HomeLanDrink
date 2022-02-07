import { useState, useEffect } from "react";

import { useParams, Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backEndUrl from "../setup/hld_url";

function NoticeDetailPage() {
  const BEUrl = backEndUrl;
  const history = useHistory();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  const getNotice = () => {
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
      method: "get",
    })
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(getNotice, [BEUrl, id]);
  const setToken = () => {
    const token = localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  };
  const onDeleteNotice = (event) => {
    event.preventDefault();
    axios({
      url: `${BEUrl}/api/v1/notice/${id}`,
      method: "delete",
      headers: setToken(),
    })
      .then(() => {
        history.push("/notice");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="mt-3">글 세부사항</h1>
      <div>
        <h4>제목: {notice.title}</h4>
        <p>작성시간: {notice.updatedAt}</p>
        <p>내용: {notice.content}</p>
      </div>
      <Link
        to={`/notice-edit/${id}`}
        className="d-flex justify-content-center mt-3"
      >
        <Button type="submit">수정하기</Button>
      </Link>
      <Form>
        <Form.Group className="d-flex justify-content-center mt-3">
          <Button type="submit" onClick={onDeleteNotice}>
            삭제하기
          </Button>
          <Link to="/notice">
            <Button>목록</Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}

export default NoticeDetailPage;