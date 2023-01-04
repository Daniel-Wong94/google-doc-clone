const SET_MESSAGES = "messages/SET_MESSAGES";
const ADD_MESSAGE = "messages/ADD_MESSAGE";

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const getMessages = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}/messages/`);

  if (response.ok) {
    const { Messages: messages } = await response.json();

    dispatch(setMessages(messages));
  }
};

export const createMessage = (documentId, payload) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}/messages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const { Message: message } = await response.json();
    await dispatch(addMessage(message));
  }
};

const initialState = [];

const messagesReducer = (state = initialState, action) => {
  let newState = [...state];

  switch (action.type) {
    case SET_MESSAGES:
      return action.payload;
    case ADD_MESSAGE:
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
