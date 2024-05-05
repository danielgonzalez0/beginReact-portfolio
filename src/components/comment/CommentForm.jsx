import { TextField } from "../atom/TextField";
import { Button } from "../atom/Button";
import CommentError from "./CommentError";
import useCommentCheckErrors from "./useCommentCheckErrors";


export const CommentForm = ({ addComments }) => {
  const { nameError, commentError, checkUserName, checkComment, clearNameError, clearCommentError, setErrorDB } = useCommentCheckErrors();

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
    await addComments(dataToSubmit)
      .then(() => {
        e.target.reset();
      })
      .catch((error) => {
        console.log("error", error);
        setErrorDB(error);
      });

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
        onFocus={() => clearNameError()}
        onChange={(e) => checkUserName(e.target.value)} />

      <CommentError error={nameError} />

      <TextField
        label="Comment"
        id="comment"
        type="text"
        name="Comment"
        placeholder="Comment"
        component="textarea"
        onFocus={() => clearCommentError()}
        onChange={(e) => checkComment(e.target.value)}

      />
      <CommentError error={commentError} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
