// constants
const SET_DOCUMENTS = "documents/SET_DOCUMENTS";
const SET_CURRENT_DOCUMENT = "documents/SET_CURRENT_DOCUMENT";
const UPDATE_CURRENT_DOCUMENT = "documents/UPDATE_CURRENT_DOCUMENT";
const REMOVE_DOCUMENT = "documents/REMOVE_DOCUMENT";

// ACTION CREATORS
const setDocuments = (documents) => ({
  type: SET_DOCUMENTS,
  payload: documents,
});

const setCurrentDocument = (document) => ({
  type: SET_CURRENT_DOCUMENT,
  payload: document,
});

const updateCurrentDocument = (document) => ({
  type: UPDATE_CURRENT_DOCUMENT,
  payload: document,
});

export const removeDocument = (documentId) => ({
  type: REMOVE_DOCUMENT,
  payload: documentId,
});

// THUNKS
export const loadAllDocuments =
  (owned_by = "me") =>
  async (dispatch) => {
    const response = await fetch(`/api/documents/?owned_by=${owned_by}`);
    const { Documents: documents } = await response.json();

    if (response.ok) {
      const normalizedData = {};
      documents.forEach((document) => (normalizedData[document.id] = document));
      await dispatch(setDocuments(normalizedData));
      return normalizedData;
    }
  };

export const loadCurrentDocument = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}`);

  if (response.ok) {
    const { Document: document } = await response.json();
    await dispatch(setCurrentDocument(document));
  } else {
    throw new Error();
  }
};

export const createDocument = (text) => async (dispatch) => {
  const form = new FormData();
  form.append("text", text);

  const response = await fetch(`/api/documents/`, {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    const { Document: document } = await response.json();
    return document;
  }
};

export const editCurrentDocument =
  (payload, documentId) => async (dispatch) => {
    const response = await fetch(`/api/documents/${documentId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      await dispatch(updateCurrentDocument(data));
      return data;
    }
  };

export const deleteDocument = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (response.ok) {
    await dispatch(removeDocument(documentId));
    return data;
  }
};

// REDUCER
const initialState = {};

const documentsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_DOCUMENTS:
      return { ...action.payload };
    case SET_CURRENT_DOCUMENT:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_CURRENT_DOCUMENT:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_DOCUMENT:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default documentsReducer;
