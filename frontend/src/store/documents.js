// constants
const SET_DOCUMENTS = "documents/SET_DOCUMENTS";
const SET_CURRENT_DOCUMENT = "documents/SET_CURRENT_DOCUMENT";

const setDocuments = (documents) => ({
  type: SET_DOCUMENTS,
  payload: documents,
});

const setCurrentDocument = (document) => ({
  type: SET_CURRENT_DOCUMENT,
  payload: document,
});

export const loadAllDocuments =
  (owned_by = "me") =>
  async (dispatch) => {
    const response = await fetch(`/api/documents/?owned_by=${owned_by}`);
    const { Documents: documents } = await response.json();

    if (response.ok) {
      const normalizedData = {};
      documents.forEach((document) => (normalizedData[document.id] = document));
      dispatch(setDocuments(normalizedData));
      return normalizedData;
    }
  };

export const loadCurrentDocument = (documentId) => async (dispatch) => {
  const response = await fetch(`/api/documents/${documentId}`);
  const { Document: document } = await response.json();

  if (response.ok) {
    dispatch(setCurrentDocument(document));
  }
};

export const createDocument = () => async (dispatch) => {
  const response = await fetch(`/api/documents/`, {
    method: "POST",
  });

  if (response.ok) {
    const { Document: document } = await response.json();
    console.log("BACKEND", document);
    return document;
  }
};

const initialState = {};

const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DOCUMENTS:
      return { ...action.payload };
    case SET_CURRENT_DOCUMENT:
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
};

export default documentsReducer;
