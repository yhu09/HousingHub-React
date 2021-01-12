import React, { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import cookie from "react-cookies";
import { APIBASE } from "../../utility/api-base";

const HouseComments = ({ houseAddress, comments, token }) => {
  console.log(comments);
  return (
    <HouseCommentsStructure
      houseAddress={houseAddress}
      comments={comments}
      token={token}
    ></HouseCommentsStructure>
  );
};

const Comments = ({ houseAddress, comments }) => {
  const [inputComment, setInputComment] = useState("");

  function fillText(event) {
    setInputComment(event.target.value);
  }

  async function handleChildComment(event) {
    event.preventDefault();

    let email = cookie.load("email");
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        house: houseAddress,
        author: email,
        content: inputComment
      })
    };
    await fetch(APIBASE + "comment", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("Comment submitted");

    window.location.reload(true);
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <HouseComment comment={comment} index={index} key={index}></HouseComment>
      ))}
    </div>
  );
};

const HouseComment = ({ comment, index }) => {
  const [collapsed, setCollapsed] = useState(true);
  function handleCollapse() {
    setCollapsed(!collapsed);
  }

  return (
    <div>
      <Comment key={index}>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>{comment.createddate}</Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleCollapse}>Reply</Comment.Action>
            <Comment.Group collapsed={collapsed}>
              <Form reply size="mini">
                <Form.TextArea />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Comment.Group>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </div>
  );
};

const HouseCommentsStructure = ({ houseAddress, comments, token }) => {
  const [inputComment, setInputComment] = useState("");

  async function handleParentComment(event) {
    event.preventDefault();

    let email = cookie.load("email");
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        house: houseAddress,
        author: email,
        content: inputComment
      })
    };
    await fetch(APIBASE + "comment", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("Comment submitted");

    window.location.reload(true);
  }

  function fillText(event) {
    setInputComment(event.target.value);
  }

  function renderForm() {
    return (
      <Comment.Group threaded={false}>
        <Header as="h3" dividing>
          Comments
        </Header>

        <Comments houseAddress={houseAddress} comments={comments}></Comments>

        <Form reply onSubmit={handleParentComment}>
          <Form.TextArea onChange={fillText} />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
    );
  }

  return <div>{renderForm()}</div>;
};

export default HouseComments;
