import { TextField } from "../atom/TextField";
import { Button } from "../atom/Button";
import { useState } from "react";
import CommentError from "./CommentError";

export const CommentForm = () => {

  const [nameError, setNameError] = useState("");
  const [commentError, setCommentError] = useState("");

  const checkUserName = (userName) => {
    if (userName.length < 3 || userName.length > 20) {
      setNameError("Username must be between 3 and 20 characters");
      return
    }
    setNameError("");
    return
  }

  const checkComment = (comment) => {
    if (comment.length < 10 || comment.length > 100) {
      setCommentError("comment must be between 10 and 100 characters");
      return
    }
    setCommentError("");
    return
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const comment = e.target.comment.value;
    checkUserName(name);
    checkComment(comment);

    if (nameError || commentError) return

    e.preventDefault();
    const dataToSubmit = {
      username: name,
      comment: comment,
    }
    console.log(dataToSubmit);
    e.target.reset();
  }
  // Commentaire - Exercise
  return (
    <form className="flex flex-col gap-4 w-full md:px-8" onSubmit={handleSubmit}>
      <TextField
        label="Username"
        id="username"
        type="text"
        placeholder="Username"
        onFocus={() => setNameError("")}
        onChange={(e) => checkUserName(e.target.value)} />

      <CommentError error={nameError} />

      <TextField
        label="Comment"
        id="comment"
        type="text"
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
