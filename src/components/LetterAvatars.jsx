// import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function LetterAvatars() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" spacing={2} onClick={handleClick}>
        <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30 }}>
          {" "}
          D{" "}
        </Avatar>
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
        <UserIcon className="size-4 mr-2" />
        Perfil
        </MenuItem>
        <MenuItem component={Link} to="/login" onClick={logout}>
          <ArrowLeftEndOnRectangleIcon className="size-4  mr-2" />
          Salir
        </MenuItem>
      </Menu>
    </>
  );
}
