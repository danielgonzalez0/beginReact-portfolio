import { TextField } from "../atom/TextField";
import { Button } from "../atom/Button";
import { useState } from "react";
import CommentError from "./CommentError";
import { commentsUrl } from "../../lib/api-url";

export const CommentForm = ({updateComments}) => {

  const [nameError, setNameError] = useState("");
  const [commentError, setCommentError] = useState("");


  const checkUserName = (userName) => {
    if (userName.length < 3 || userName.length > 20) {
      setNameError("Username must be between 3 and 20 characters");
      return
    }
    setNameError("");
  }

  const checkComment = (comment) => {
    if (comment.length < 10 || comment.length > 100) {
      setCommentError("comment must be between 10 and 100 characters");
      return
    }
    setCommentError("");
  }

  const addCommentToDB = async (dataToSubmit) => {
    console.log(dataToSubmit);
    fetch(commentsUrl, {
      method: 'POST',
      body: JSON.stringify(dataToSubmit),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        setCommentError(data.error);
      } else {
        updateComments();
      }
    }).catch((error) => {
      setCommentError(error.message);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("Username");
    const comment = formData.get("Comment");
    checkUserName(name);
    checkComment(comment);

    if (nameError || commentError) return

    const dataToSubmit = {
      username: name,
      comment: comment,
    }
    console.log("data", dataToSubmit);
    await addCommentToDB(dataToSubmit);
    e.target.reset();
  }
  // Commentaire - Exercise
  return (
    <form className="flex flex-col gap-4 w-full md:px-8" onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="username"
        type="text"
        name="Username"
        placeholder="Username"
        onFocus={() => setNameError("")}
        onChange={(e) => checkUserName(e.target.value)} />

      <CommentError error={nameError} />

      <TextField
        label="Comment"
        id="comment"
        type="text"
        name="Comment"
        placeholder="Comment"
        component="textarea"
        onFocus={() => setCommentError("")}
        onChange={(e) => checkComment(e.target.value)}

      />
      <CommentError error={commentError} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
