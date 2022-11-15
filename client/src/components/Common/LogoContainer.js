import { Grid } from "@material-ui/core";

export const LogoContainer = ({ children }) => {
  return (
    <Grid className="logo-container" container justifyContent="center" item xs={12} md={3}>
      {children}
    </Grid>
  );
}