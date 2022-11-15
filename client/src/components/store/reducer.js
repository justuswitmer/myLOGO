export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "add_report":
      return { ...state, report: action.payload };
    case "load_logos":
      return { ...state, logos: action.payload };
    case "edit_gallery":
      return { ...state, editGallery: action.payload };
    default:
      return state;
  }
};
