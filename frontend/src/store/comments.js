const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
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

const initialState = [];

const commentsReducer = (state = initialState, action) => {
  let newState = [...state];

  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
