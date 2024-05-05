/**
 * To get all stargazed repositories of a user
 *
 * @param username string Your username
 * @returns {`/api/pinnedGithubRepository?username=${string}`}
 */
export const getListOfUrlRepositoriesUrl = (username) => {
  return `/api/pinnedGithubRepository?username=${username}`;
};

/**
 * To get all comment use the "GET" method
 * 
 * To add a new comment use the "POST" method with the following body:
 * { username: "...", comment: "..." }
 *
 * @type {string}
 */

/**
 * Sends a POST request to add a new comment.
 *
 * @param {Object} newComment - The comment to be added. This should be an object with properties corresponding to the comment fields.
 * @param {Function} onSuccess - A callback function that will be called if the request is successful.
 * @returns {Promise} A Promise that resolves to the response data if the request is successful, or rejects with an error message if the request fails.
 */
export const addComments = async (newComment, onSuccess) => {
  return fetch(commentsUrl, {
    method: 'POST',
    body: JSON.stringify(newComment),
  }).then(async (res) => {
    const data = await res.json();
    if (res.ok) {
      onSuccess();
      return data
    } else {
      console.log(data.error);
      return Promise.reject(data.error)
    }
  })
}

export const commentsUrl = "api/comments";
