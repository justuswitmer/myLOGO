export const reducer = (state = {}, action) => {
  switch (action.type) {
    case "add_report":
      return { ...state, report: action.payload };
    case "load_logos":
      return { ...state, logos: action.payload };
    case "waitingForLogos":
      return { ...state, areLogosLoading: action.payload };
    default:
      return state;
  }
};