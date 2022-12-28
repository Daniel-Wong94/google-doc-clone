// constants
const SET_USER_DOCUMENTS = "userDocuments/SET_USER_DOCUMENTS";
const ADD_USER_DOCUMENTS = "userDocuments/ADD_USER_DOCUMENTS";
// ACTION CREATORS
const setUserDocuments = (documents) => ({
  type: SET_USER_DOCUMENTS,
  payload: documents,
});

const addUserDocuments = (payload) => ({
  type: ADD_USER_DOCUMENTS,
  payload,
});

// THUNKS
export const loadUserDocuments = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}/users`);
  const { Users: users } = await response.json();

  if (response.ok) {
    const normalizedData = {};
    users.forEach((user) => (normalizedData[user.user_id] = user));
    await dispatch(setUserDocuments(normalizedData));
    return normalizedData;
  }
};

export const createUserDocuments =
  (documentId, payload) => async (dispatch) => {
    const response = await fetch(`/api/documents/${documentId}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      await dispatch(addUserDocuments(data));
    } else {
      const errors = {};
      data.errors.forEach((err) => {
        const [k, v] = err.split(" : ");
        errors[k] = v;
      });

      const err = new Error();
      err.errors = errors;
      throw err;
    }
  };

// REDUCER
const initialState = {};

const userDocumentsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER_DOCUMENTS:
      return { ...action.payload };
    case ADD_USER_DOCUMENTS:
      newState[action.payload["user_id"]] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default userDocumentsReducer;
