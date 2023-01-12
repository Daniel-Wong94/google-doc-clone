const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  payload: commentId,
});

export const getComments = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}/comments/`);

  if (response.ok) {
    const { Comments: comments } = await response.json();

    dispatch(setComments(comments));
  }
};

export const createComment = (documentId, payload) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const { Comment: comment } = await response.json();
    dispatch(addComment(comment));
    return comment;
  }
};

export const deleteComment = (documentId, commentId) => async (dispatch) => {
  const response = await fetch(
    `/api/documents/${documentId}/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(removeComment(commentId));
    return data;
  }
};

const initialState = [];

const commentsReducer = (state = initialState, action) => {
  let newState = [...state];

  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      newState.push(action.payload);
      return newState;
    case REMOVE_COMMENT:
      return newState.filter((comment) => comment.id != action.payload);
    default:
      return state;
  }
};

export default commentsReducer;
