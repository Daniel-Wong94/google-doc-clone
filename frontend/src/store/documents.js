// constants
const SET_DOCUMENTS = "documents/SET_DOCUMENTS";

const setDocuments = (documents) => ({
  type: SET_DOCUMENTS,
  payload: documents,
});

export const loadAllDocuments =
  (owned_by = "me") =>
  async (dispatch) => {
    const response = await fetch(`/api/documents/?owned_by=${owned_by}`);
    const { Documents: documents } = await response.json();

    if (response.ok) {
      const normalizedData = {};
      console.log("DOCUMENTS", documents);
      documents.forEach((document) => (normalizedData[document.id] = document));
      dispatch(setDocuments(normalizedData));
      return normalizedData;
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
    default:
      return state;
  }
};

export default documentsReducer;
