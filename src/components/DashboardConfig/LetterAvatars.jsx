// import * as React from "react";
import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { UserContext } from "../../context/UserContext";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ModalUser from "../Login/ModalUser";
import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function LetterAvatars() {
  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuth();
  const { clearUserInfo } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);


  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  const handleOut = () => {
    logout();
    clearUserInfo();
  };

  return (
    <>
      <Stack direction="row" spacing={2} onClick={handleClick}>
        <Avatar
          src={`https://robohash.org/${user.apodo}.png`}
          sx={{ bgcolor: blue[50], width: 30, height: 30 }}
        ></Avatar>
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
        <MenuItem onClick={handleOpenModal}>
          <UserIcon className="size-4 mr-2" />
          Perfil
          
        </MenuItem>
        <MenuItem component={Link} to="/login" onClick={handleOut}>
          <ArrowLeftEndOnRectangleIcon className="size-4  mr-2" />
          Salir
        </MenuItem>
      </Menu>
      <ModalUser open={openModal} handleClose={handleCloseModal} />

    </>
  );
}
