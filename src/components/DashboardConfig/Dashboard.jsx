import { useState, useContext, useEffect, Fragment } from "react";
import { UserContext } from '../../context/UserContext';
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
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { HomeIcon, CurrencyDollarIcon, ClipboardDocumentListIcon, UsersIcon,CalendarDaysIcon} from "@heroicons/react/24/solid";

import Swal from 'sweetalert2';

import LetterAvatars from "./LetterAvatars";
import GetRegister from '../Processes/GetRegister'
import Schedule from '../Processes/Schedule'
const drawerWidth = 250;

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
})
);

const defaultTheme = createTheme();

export default function Dashboard() {
  const [surveyAct, setSurveyAct] = useState(0);

  const [open, setOpen] = useState(true);
  const [selectedElement, setSelectedElement] = useState(null);
  const { user } = useContext(UserContext);
  const [menu, setMenu] = useState([])

  const [openStates, setOpenStates] = useState({});

  const navigation = [
    { name: "Reportes", icon: ClipboardDocumentListIcon },
    { name: "CRM", icon: UsersIcon },
    { name: "Ventas", component: Schedule, icon: CurrencyDollarIcon },
    
    { name: "Obtener registro", component: GetRegister, icon: CurrencyDollarIcon },
    { name: "Agenda", component: Schedule, icon: CalendarDaysIcon },
  ];
  
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const url = 'https://localhost:4001/apiCrm/getMenu';
          const params = {
            id_user: user.ID_USER,
            id_perfil: user.PERFIL
          };
          const response = await axios.post(url, params, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setMenu(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [user]);

  const groupedMenuItems = menu.reduce((acc, item) => {
    const { ID_TYPE_MENU, NAME_TYPE } = item;
    if (!acc[ID_TYPE_MENU]) {
      acc[ID_TYPE_MENU] = { NAME_TYPE, items: [] };
    }
    acc[ID_TYPE_MENU].items.push(item);
    return acc;
  }, {});


  const renderSelectedComponent = () => {
    if (surveyAct === 0) {
      const selectedItem = navigation.find((item) => item.name === selectedElement);
      return selectedItem ? (
        <selectedItem.component
          surveyAct={surveyAct}
          setSurveyAct={setSurveyAct}
          setSelectedElement={setSelectedElement}
        />
      ) : null;
    } else {
      return (
        <GetRegister
          surveyAct={surveyAct}
          setSurveyAct={setSurveyAct}
          setSelectedElement={setSelectedElement}
        />
      );
    }
  };


  const renderIconComponent = (iconName) => {
    const selectedItem = navigation.find((item) => item.name == iconName);
    return selectedItem ? <selectedItem.icon className="size-4 text-blue-500 mr-2" /> : null;
  };


  const handleClick = (tipoMenu) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [tipoMenu]: !prevState[tipoMenu]
    }));
  };



  const handleElementClick = (element) => {
    if (selectedElement) {
      Swal.fire({
        title: 'Estas seguro de salir?',
        text: "Perderas los datos no guardados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'NO'
      }).then((result) => {
        if (result.isConfirmed) {
          if (element === "Inicio" || element === selectedElement) {
            setSelectedElement(null);
          } else {
            setSelectedElement(element);
          }
        }
      });
    } else {
      if (element === "Inicio") {
        setSelectedElement(null);
      } else {
        setSelectedElement((prev) => (prev === element ? null : element));
      }
    }
  }



  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}
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
              Hola {user.NAME_USER} ---- {surveyAct}
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Centro {user.EMPRESA} 
            </Typography>
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Firmado en {user.modality == 1 ? "Asistido" : "Predictivo" }
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
            <ListItemButton key={9999} onClick={() => handleElementClick('Inicio')}>
              <ListItemIcon>
                <HomeIcon className="size-4 text-blue-500 mr-2" />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>

            {Object.entries(groupedMenuItems).map(([ID_TYPE_MENU, { NAME_TYPE, items }]) => (
              <Fragment key={ID_TYPE_MENU}>
                <ListItemButton onClick={() => handleClick(ID_TYPE_MENU)}>
                  <ListItemIcon>
                    {renderIconComponent(NAME_TYPE)}
                  </ListItemIcon>
                  <ListItemText primary={NAME_TYPE} />
                  {openStates[ID_TYPE_MENU] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates[ID_TYPE_MENU]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {items.map(({ ID_MENU, NAME_MENU }) => (
                      <ListItemButton
                        key={ID_MENU}
                        sx={{ pl: 3 }}
                        onClick={() => handleElementClick(NAME_MENU)}
                      >
                        <ListItemIcon>
                          {renderIconComponent(NAME_MENU)}
                        </ListItemIcon>
                        <ListItemText primary={NAME_MENU} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Fragment>
            ))}

            <Divider />
          </List>

          <Box sx={{ flexGrow: 1}} />
          <Divider />
          <List>
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Firmado en {user.modality == 1 ? "Asistido" : "Predictivo" }
            </Typography>
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

