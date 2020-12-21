import React, { useState } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import cookie from "react-cookies";

export default function HouseComments({ houseAddress, comments }) {
  console.log(comments);
  return (
    <HouseCommentsStructure
      houseAddress={houseAddress}
      comments={comments}
    ></HouseCommentsStructure>
  );
}

function Comments({ houseAddress, comments }) {
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
    await fetch("http://localhost:3002/comment", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("Comment submitted");

    window.location.reload(true);
  }

  function replyButton() {
    return <Button onClick={nestedReply}>Reply</Button>;
  }

  function nestedReply() {
    console.log("nestedREply");
    return (
      <Form reply onSubmit={handleChildComment}>
        <Form.TextArea onChange={fillText} />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    );
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <Comment key={index}>
          <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/joe.jpg" />
          <Comment.Content>
            <Comment.Author as="a">{comment.author}</Comment.Author>
            <Comment.Metadata>{comment.createddate}</Comment.Metadata>
            <Comment.Text>{comment.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </div>
  );
}

function HouseCommentsStructure({ houseAddress, comments }) {
  const [inputComment, setInputComment] = useState("");

  async function handleParentComment(event) {
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
    await fetch("http://localhost:3002/comment", requestOptions)
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
      <Comment.Group threaded>
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
  // {
  //   /* <div className="HouseReviewForm">{renderForm()}</div>; */
  // }
}
