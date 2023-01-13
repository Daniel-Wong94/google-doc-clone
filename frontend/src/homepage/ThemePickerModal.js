import { Modal, Fade, Grid, Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const ThemePickerModal = ({ openThemePicker, setOpenThemePicker }) => {
  const user = useSelector((state) => state.session.user);
  const [color, setColor] = useState(user?.color);

  const THEME_COLORS = [
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
  ];

  return (
    <Modal
      open={openThemePicker}
      onClose={() => setOpenThemePicker(false)}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Fade in={openThemePicker}>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1" fontSize={24}>
            Select a Color:
          </Typography>
          <Grid container spacing={1} columns={5} rows={3}>
            {THEME_COLORS.map((color) => {
              return (
                <Grid item key={color}>
                  <Box
                    bgcolor={color}
                    borderRadius="50%"
                    width="50px"
                    height="50px"
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ThemePickerModal;
