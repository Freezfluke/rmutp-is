import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Logo from "../Logo/Logo.jpg";
import { useSelector } from "react-redux";
import SchoolIcon from "@mui/icons-material/School";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Menu(props) {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const { user } = auth;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <img style={{ width: 60, marginRight: 10 }} src={Logo} alt="" />
        <Typography variant="h6" noWrap component="div">
          ระบบสารสนเทศ
        </Typography>
      </DrawerHeader>
      <Divider />
      {user.role === "เจ้าหน้าที่สาขา" ? (
        <List>
          <ListItem
            button
            key="ดาวน์โหลดแบบคำร้อง"
            component={NavLink}
            to="/home"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ดาวน์โหลดแบบคำร้อง" />
          </ListItem>
          <ListItem
            button
            key="จัดการผู้ใช้งาน"
            component={NavLink}
            to="/users"
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการผู้ใช้งาน" />
          </ListItem>
          <ListItem
            button
            key="จัดการชั้นเรียน"
            component={NavLink}
            to="/classrooms"
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการชั้นเรียน" />
          </ListItem>
          <ListItem
            button
            key="จัดการคำร้อง"
            component={NavLink}
            to="/petition"
          >
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการคำร้อง" />
          </ListItem>
        </List>
      ) : (
        <div></div>
      )}
      {user.role === "หัวหน้าสาขา" ? (
        <List>
          <ListItem
            button
            key="ดาวน์โหลดแบบคำร้อง"
            component={NavLink}
            to="/home"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ดาวน์โหลดแบบคำร้อง" />
          </ListItem>
          <ListItem
            button
            key="จัดการผู้ใช้งาน"
            component={NavLink}
            to="/users"
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการผู้ใช้งาน" />
          </ListItem>
          <ListItem
            button
            key="จัดการชั้นเรียน"
            component={NavLink}
            to="/classrooms"
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการชั้นเรียน" />
          </ListItem>
          <ListItem
            button
            key="จัดการคำร้อง"
            component={NavLink}
            to="/petition"
          >
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="จัดการคำร้อง" />
          </ListItem>
        </List>
      ) : (
        <div></div>
      )}
      {user.role === "อาจารย์" ? (
        <List>
          <ListItem
            button
            key="ดาวน์โหลดแบบคำร้อง"
            component={NavLink}
            to="/home"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ดาวน์โหลดแบบคำร้อง" />
          </ListItem>

          <ListItem
            button
            key="ตรวจสอบคำร้อง"
            component={NavLink}
            to="/petition"
          >
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="ตรวจสอบคำร้อง" />
          </ListItem>
        </List>
      ) : (
        <div></div>
      )}
      {user.role === "นักศึกษา" ? (
        <List>
          <ListItem
            button
            key="ดาวน์โหลดแบบคำร้อง"
            component={NavLink}
            to="/home"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="ดาวน์โหลดแบบคำร้อง" />
          </ListItem>
          <ListItem button key="ยื่นคำร้อง" component={NavLink} to="/petition">
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="ยื่นคำร้อง" />
          </ListItem>
        </List>
      ) : (
        <div></div>
      )}
      <Divider />
    </Drawer>
  );
}
