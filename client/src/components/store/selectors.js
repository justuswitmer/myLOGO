import moment from "moment";

export const getIsAuthorized = () => {
  const authorizedUser = JSON.parse(localStorage.getItem("authorization"));

  if (authorizedUser) {
    return moment().isBefore(authorizedUser.expiresIn);
  }
  return false;
};

export const getUserId = () => {
  const authorizedUser = JSON.parse(localStorage.getItem("authorization"));

  if (authorizedUser) {
    return authorizedUser._id;
  }
  return false;
};
