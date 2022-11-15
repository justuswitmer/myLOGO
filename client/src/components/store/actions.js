export const addLoggedIn = (payload) => ({
  type: "add_logged_in",
  payload,
});

export const loadLogos = (payload) => ({
  type: "load_logos",
  payload,
});

export const waitingForLogos = (payload) => ({
  type: "waiting_for_logos",
  payload,
});