import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import axios from "axios";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LetterAvatars from "./LetterAvatars";
import {
  HomeIcon,
  CurrencyDollarIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  CircleStackIcon,
  ChatBubbleBottomCenterTextIcon,
  QueueListIcon,
  PhoneXMarkIcon

} from "@heroicons/react/24/solid";


import { CajaAhorro } from "./CajaAhorro";
import { Index10 } from "./Index10";
import { Utilidades } from "./Utilidades";
import { TestQuery } from "./TestQuery";
import { Chat } from "./Chat";
import { PhoneExtensions } from "./PhoneExtensions";
import { ReEtiquetado } from "./ReEtiquetado";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://172.20.2.57:4000/getMenu'
        const params = {
          id_user: user.id,
          id_perfil: user.profile
        }
        // console.log(params);
        const response = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        // console.log(response.data);
        setMenu(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, [])


  const navigation = [
    { name: "Inicio", component: "INICIO", icon: HomeIcon },
    { name: "Caja ahorro", component: CajaAhorro, icon: CurrencyDollarIcon},
    { name: "Index10", component: Index10, icon: UserIcon }, 
    { name: "Utilidades", component: Utilidades, icon: WrenchScrewdriverIcon},
    { name: "TestQuery", component: TestQuery, icon: CircleStackIcon },    
    { name: "Chat", component: Chat, icon: ChatBubbleBottomCenterTextIcon },
    { name: "Extensiones", component: PhoneExtensions, icon: QueueListIcon },
    { name: "Re etiquetado", component: ReEtiquetado, icon: PhoneXMarkIcon },
  ];


  const renderSelectedComponent = () => {
    const selectedItem = navigation.find((item) => item.name === selectedElement);
    return selectedItem ? <selectedItem.component /> : null;
  };
  const renderIconComponent = (iconName) => {
    // console.log(iconName);
    const selectedItem = navigation.find((item) => item.name == iconName);
    return selectedItem ? <selectedItem.icon className="size-4 text-blue-500 mr-2" /> : null;
  };

  const handleElementClick = (element) => {
    if (element == "Inicio") {
      setSelectedElement(null);
    } else {
      setSelectedElement((prev) => (prev === element ? null : element));
    }
  };




  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Hola {user.name}
            </Typography>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>


            <IconButton color="inherit">
              <LetterAvatars />
            </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
            {menu.map((item) => (
              <ListItemButton
                key={item.ID_MENU}
                onClick={() => handleElementClick(item.NAME_MENU)}
              >
                <ListItemIcon>
                  {/* {item.ICON_MENU && ( <item.ICON_MENU className="size-4 text-blue-500 mr-2" /> )} */}
                  {renderIconComponent(item.NAME_MENU)}

                </ListItemIcon>
                <ListItemText primary={item.NAME_MENU} />
              </ListItemButton>

            ))}


          </List>

        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {selectedElement && renderSelectedComponent()}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
