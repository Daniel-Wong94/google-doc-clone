import { Menu, MenuItem, Divider, Fade } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/session";
import { useState } from "react";
// import ThemePickerModal from "./ThemePickerModal";

const ProfileMenu = ({ anchorEl, open, onClose, onClick }) => {
  const dispatch = useDispatch();
  const [openThemePicker, setOpenThemePicker] = useState(false);

  const handleLogout = () => dispatch(logout());

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose} onClick={onClick}>
        {/* <MenuItem onClick={() => setOpenThemePicker(true)}>
          Choose Theme...
        </MenuItem>
        <Divider /> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      {/* <ThemePickerModal
        openThemePicker={openThemePicker}
        setOpenThemePicker={setOpenThemePicker}
      /> */}
    </>
  );
};

export default ProfileMenu;
