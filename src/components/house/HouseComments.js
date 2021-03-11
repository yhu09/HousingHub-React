import React, { useState, useContext, useEffect } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { APIBASE } from "../../utility/api-base";
import { useAuth0 } from "@auth0/auth0-react";
import { HouseContext } from "../../context";

const calendar = {
  "01": "January",
  "02": "Feburary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};


function formatDate(createddate) {
  let dateArr = createddate.split("-", 2);
  let year = dateArr[0];
  let monthNum = dateArr[1];
  var monthAlp = calendar[monthNum];
  return (monthAlp + " " + year);
}

const HouseComments = ({ houseAddress, comments, token }) => {
  return (
    <HouseCommentsStructure
      houseAddress={houseAddress}
      comments={comments}
      token={token}
    ></HouseCommentsStructure>
  );
};

const Comments = ({ comments }) => {
  return (
    <Comment>
      {comments.map((comment, index) => (
        <HouseComment comment={comment} index={index} key={index}></HouseComment>
      ))}
    </Comment>
  );
};

const ChildComment = ({ childComments }) => {

  return (
    <Comment.Group>
      {
        childComments.map((comment, index) => (
          <Comment>
            <Comment.Avatar src={comment.userpicture} />
            <Comment.Content>
              <Comment.Author as='b'>{comment.author}</Comment.Author>
              <Comment.Metadata> {formatDate(comment.createddate)} </Comment.Metadata>
              <Comment.Text>{comment.content}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))
      }
    </Comment.Group>

  )
}

const HouseComment = ({ comment, index }) => {
  const [replyCollapsed, setReplyCollapsed] = useState(true);
  const [childCommentsCollapsed, setChildCommentsCollapsed] = useState(true);
  const [inputChildComment, setInputChildComment] = useState("");
  const [childComments, setChildComments] = useState([]);
  const context = useContext(HouseContext);
  const [childCommentsLoaded, setChildCommentsLoaded] = useState(false);
  const { token } = context;
  const { user } = useAuth0();

  async function getChildComments() {
    await fetch(
      APIBASE + "childComment/parentid/?parentid=" + comment.commentid,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        setChildComments(data);
      });
  }

  if (!childCommentsLoaded) {
    getChildComments()
    setChildCommentsLoaded(true);
  }

  function handleReplyCollapse() {
    setReplyCollapsed(!replyCollapsed);
  }

  function handleChildCommentCollapse() {
    setChildCommentsCollapsed(!childCommentsCollapsed);
  }

  function fillText(event) {
    setInputChildComment(event.target.value);
  }

  async function handleChildComment(event) {
    event.preventDefault();

    let author = user.given_name + " " + user.family_name
    let userPicture = user.picture
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        author: author,
        content: inputChildComment,
        parent: comment.commentid,
        userPicture: userPicture
      })
    };
    console.log(requestOptions);
    await fetch(APIBASE + "childComment", requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));

    console.log("Child Comment submitted");

    window.location.reload(true);
  }

  useEffect(() => {
    console.log(childComments);
  }, [childComments]);

  if (childComments.length !== 0) {
    return (
      <Comment key={index}>
        <Comment.Avatar src = {comment.userpicture}/>
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>{formatDate(comment.createddate)}</Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleReplyCollapse}>Reply</Comment.Action>
            <Comment.Action onClick={handleChildCommentCollapse}> {childCommentsCollapsed ? "Show Reply" + " (" + (childComments.length) + ") " : "Hide Reply" + "(" + (childComments.length) + ")"} </Comment.Action>
            <Comment.Group collapsed={childCommentsCollapsed}>
              <ChildComment childComments={childComments}></ChildComment>
            </Comment.Group>
            <Comment.Group collapsed={replyCollapsed}>
              <Form reply onSubmit={handleChildComment}>
                <Form.TextArea onChange={fillText} />
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
    );
  } else {
    console.log(comment)
    return (
      <Comment key={index}>
        <Comment.Avatar src={comment.userpicture} />
        <Comment.Content>
          <Comment.Author as="a">{comment.author}</Comment.Author>
          <Comment.Metadata>{formatDate(comment.createddate)}</Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={handleReplyCollapse}>Reply</Comment.Action>
            <Comment.Group collapsed={replyCollapsed}>
              <Form reply onSubmit={handleChildComment}>
                <Form.TextArea onChange={fillText} />
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
    );
  }
};

const HouseCommentsStructure = ({ houseAddress, comments, token }) => {
  const [inputComment, setInputComment] = useState("");
  const { user } = useAuth0();

  async function handleParentComment(event) {
    event.preventDefault();

    let author = user.given_name + " " + user.family_name;
    let userPicture = user.picture; 
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        house: houseAddress,
        author: author,
        content: inputComment,
        userPicture: userPicture
      })
    };
    console.log(requestOptions);
    if (inputComment != "") {
      console.log(inputComment);
      await fetch(APIBASE + "comment", requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

      console.log("Comment submitted");

      window.location.reload(true);
    }
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

        <Form reply size="mini" onSubmit={handleParentComment}>
          <Form.TextArea onChange={fillText} />
          <Button
            content="Add Comment"
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
