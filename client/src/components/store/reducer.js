export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "load_logos":
      return { ...state, logos: action.payload };
    case "edit_gallery":
      return { ...state, editGallery: action.payload };
    default:
      return state;
  }
};
