import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled, alpha } from "@mui/material/styles";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import CreatePetition from "../components/CreatePetition";
import moment from "moment";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import data from "../mock.json";
import { nanoid } from "nanoid";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

//import getallapiPetitions
import { useState, useEffect } from "react";
import { allPetitions, deletePetition } from "../actions/petitions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputLabel from "@mui/material/InputLabel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { allUser, deleteUser, read } from "../actions/auth";
import { allClassRoom, readClassroom } from "../actions/classRooms.js";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  fontSize: 22,
  padding: theme.spacing(0),
}));

const FontDiv = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  fontSize: 14,
  padding: theme.spacing(1),
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "16px",
  },
}));

const Petition = () => {
  const [open, setOpen] = useState(false);
  const [petitions, setPetitions] = useState([]);
  const [petitionsAppoveEnd, setPetitionsAppoveEnd] = useState([]);
  const [petitionsCancel, setPetitionsCancel] = useState([]);
  const [petitionsAwaitCheck, setPetitionsAwaitCheck] = useState([]);
  const [petitionsAwiatAppoveByTeacher, setPetitionsAwiatAppoveByTeacher] =
    useState([]);
  const [
    pettitonsAwiatAppoveByBranchHead,
    setPettitonsAwiatAppoveByBranchHead,
  ] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [owner, setOwner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [statusTab, setStatusTab] = useState("");
  const [searchName, setSearchName] = useState("");
  const [openReload, setOpenReload] = useState(false);
  const [date, setDate] = useState("");
  const [order, setOrder] = useState("ASC");

  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPosts = petitions.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumber = [];

  const sorting = (col) => {
    if (order === "ASC") {
      console.log("col", col);
      console.log(currentPosts);
      const sorted = [...petitions].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      console.log("sorted", sorted);
      setPetitions(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...petitions].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setPetitions(sorted);
      setOrder("ASC");
    }
  };

  const handleClickPetitionAppoveByTeacher = () => {
    setStatusTab("แบบคำร้องถูกต้อง");
  };

  const handleClickPetitionAppoveByBranchHead = () => {
    setStatusTab("ที่ปรึกษาอนุมัติแล้ว");
  };

  const handleClickPetitionAll = () => {
    setStatusTab("ทั้งหมด");
  };

  const handleClickPetitionCancel = () => {
    setStatusTab("แบบคำร้องไม่ถูกต้อง");
  };

  const handleClickPetitionAwiatCheck = () => {
    setStatusTab("รอเจ้าหน้าที่ตรวจสอบ");
  };

  const handleClickPetitionSucess = () => {
    setStatusTab("หัวหน้าสาขาอนุมัติแล้ว");
  };

  for (let i = 1; i <= Math.ceil(petitions.length / postsPerPage); i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    loadAllPetitions();
  }, []);

  const handlePetitionDelete = async (petitionId) => {
    if (!window.confirm("คุณแน่ใจว่าจะลบแบบคำร้องนี้ใช่หรือไม่?")) return;
    deletePetition(auth.token, petitionId).then((res) => {
      toast.success("แบบคำร้องถูกลบเรียบร้อยแล้ว");
      loadAllPetitions();
    });
  };

  const cardDate = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          วันที่
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h5"
          component="div"
        >
          {date}
          <Fab
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardCountUser = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องทั้งหมด
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitions.length}
          <Fab
            onClick={handleClickPetitionAll}
            style={{
              backgroundColor: "blue",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardAwiatCheck = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่รอการตรวจสอบ
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsAwaitCheck.length}
          <Fab
            onClick={handleClickPetitionAwiatCheck}
            style={{
              backgroundColor: "orange",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardCountTeacher = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่อนุมัติเสร็จสิ้น
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsAppoveEnd.length}
          <Fab
            style={{
              backgroundColor: "green",
              color: "white",
              width: "70px",
              height: "70px",
            }}
            onClick={handleClickPetitionSucess}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardAwiatApproveBranchHead = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่รอการอนุมัติ
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {pettitonsAwiatAppoveByBranchHead.length}
          <Fab
            style={{
              backgroundColor: "orange",
              color: "white",
              width: "70px",
              height: "70px",
            }}
            onClick={handleClickPetitionAppoveByBranchHead}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardAwiatApproveTeacher = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่รอการอนุมัติ
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsAwiatAppoveByTeacher.length}
          <Fab
            style={{
              backgroundColor: "orange",
              color: "white",
              width: "70px",
              height: "70px",
            }}
            onClick={handleClickPetitionAppoveByTeacher}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const cardCountStudent = (
    <Card sx={{ minWidth: "auto" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          แบบคำร้องที่ถูกปฎิเสธ
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          variant="h4"
          component="div"
        >
          {petitionsCancel.length}
          <Fab
            onClick={handleClickPetitionCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              width: "70px",
              height: "70px",
            }}
          >
            <DocumentScannerIcon sx={{ fontSize: 40 }} color="white" />
          </Fab>
        </Typography>
      </CardContent>
    </Card>
  );

  const loadAllPetitions = async () => {
    setOpenReload(true);
    let setupPetitions = [];
    let getDate = new Date();
    let resultDate = getDate.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(resultDate);
    let resPetitions = await allPetitions();
    let resUsers = await allUser();
    let resClassRoom = await allClassRoom();
    let desPetitions = [...resPetitions.data];
    let desUsers = [...resUsers.data];
    let desClassroom = [...resClassRoom.data];
    desPetitions.map(async (petition) => {
      let _itemStudent = await desUsers.filter((e) => {
        return petition.from === e._id;
      })[0];
      console.log("item_student", _itemStudent);
      let _itemClassRoom = await desClassroom.filter((e) => {
        return _itemStudent.classRoom === e._id;
      })[0];
      console.log("_itemClassRoom", _itemClassRoom);
      let _itemTeacher = await desUsers.filter((e) => {
        return _itemClassRoom.teacher === e._id;
      })[0];
      let _itemBranchHead = await desUsers.filter((e) => {
        return e.role === "หัวหน้าสาขา";
      })[0];
      console.log("_itemTeacher", _itemTeacher);
      let ReloadItemStudent = await _itemStudent;
      let ReloadBranchHead = await _itemBranchHead;
      let ReloadItemClassRoom = await _itemClassRoom;
      let ReloadItemTeacher = await _itemTeacher;
      console.log("ReloadItemStudent", ReloadItemStudent);
      console.log("ReloadItemClassRoom", ReloadItemClassRoom);
      console.log("ReloadItemTeacher", ReloadItemTeacher);
      setupPetitions.push({
        _id: petition._id,
        email: petition.email,
        typePetition: petition.typePetition,
        petitionName: petition.petitionName,
        dateAppoveTeacher: petition.dateAppoveTeacher,
        dateAppoveBranchHead: petition.dateAppoveBranchHead,
        from: ReloadItemStudent,
        branchHead: ReloadBranchHead,
        class: ReloadItemClassRoom,
        teacher: ReloadItemTeacher,
        status: petition.status,
        petitionImage: petition.petitionImage,
        comment: petition.comment,
        createdAt: petition.createdAt,
        updatedAt: petition.updatedAt,
        __v: petition.__v,
      });
      let ReloadPetitions = await setupPetitions.filter((e) => {
        return e;
      });
      console.log("ReloadPetitions", ReloadPetitions);

      if (user.role === "อาจารย์") {
        var owenTeacher = await ReloadPetitions.filter((e) => {
          if (e.teacher.teacher === "") {
            return "";
          } else {
            return e.teacher.email === user.email;
          }
        });
        console.log("owenTeacher", owenTeacher);
        var filterStatus = await owenTeacher.filter((e) => {
          return (
            e.status === "แบบคำร้องถูกต้อง" ||
            e.status === "ที่ปรึกษาอนุมัติแล้ว" ||
            e.status === "หัวหน้าสาขาอนุมัติแล้ว"
          );
        });
        console.log("filterStatus", filterStatus);
        setPetitions(filterStatus);
        let allPetitionsAppove = await filterStatus.filter((e) => {
          return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
        });
        setPetitionsAppoveEnd(allPetitionsAppove);
        let allPetitionsCancel = await filterStatus.filter((e) => {
          return e.status === "แบบคำร้องไม่ถูกต้อง";
        });
        let allPetitionsAppoveByTeacher = await filterStatus.filter((e) => {
          return e.status === "แบบคำร้องถูกต้อง";
        });
        setPetitionsCancel(allPetitionsCancel);
        setPetitionsAwiatAppoveByTeacher(allPetitionsAppoveByTeacher);
        setStatusTab("แบบคำร้องถูกต้อง");
      }
      if (user.role === "นักศึกษา") {
        let owenRes = await ReloadPetitions.filter((e) => {
          return e.email === user.email;
        });
        setPetitions(owenRes);
        let allPetitionsAppove = await owenRes.filter((e) => {
          return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
        });
        setPetitionsAppoveEnd(allPetitionsAppove);
        let allPetitionsCancel = await owenRes.filter((e) => {
          return e.status === "แบบคำร้องไม่ถูกต้อง";
        });
        setPetitionsCancel(allPetitionsCancel);
      }
      if (user.role === "หัวหน้าสาขา") {
        let owenBranchhead = await ReloadPetitions.filter((e) => {
          return e.branchHead.email === user.email;
        });
        var filterStatus = await owenBranchhead.filter((e) => {
          return (
            e.status === "ที่ปรึกษาอนุมัติแล้ว" ||
            e.status === "หัวหน้าสาขาอนุมัติแล้ว"
          );
        });
        setPetitions(filterStatus);
        let allPetitionsAppove = await filterStatus.filter((e) => {
          return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
        });
        setPetitionsAppoveEnd(allPetitionsAppove);
        let allPetitionsCancel = await filterStatus.filter((e) => {
          return e.status === "แบบคำร้องไม่ถูกต้อง";
        });
        setPetitionsCancel(allPetitionsCancel);
        setStatusTab("ที่ปรึกษาอนุมัติแล้ว");
        let allPetitionsAwaitAppoveByBranchhead = await filterStatus.filter(
          (e) => {
            return e.status === "ที่ปรึกษาอนุมัติแล้ว";
          }
        );
        setPettitonsAwiatAppoveByBranchHead(
          allPetitionsAwaitAppoveByBranchhead
        );
      }
      if (user.role === "เจ้าหน้าที่สาขา") {
        let owenStaff = await ReloadPetitions.filter((e) => {
          return e;
        });
        console.log("owenStaff", owenStaff);
        setPetitions(owenStaff);
        let allPetitionsAppove = await owenStaff.filter((e) => {
          return e.status === "หัวหน้าสาขาอนุมัติแล้ว";
        });
        setPetitionsAppoveEnd(allPetitionsAppove);
        let allPetitionsCheck = await owenStaff.filter((e) => {
          return e.status === "รอเจ้าหน้าที่ตรวจสอบ";
        });
        setPetitionsAwaitCheck(allPetitionsCheck);
        let allPetitionsCancel = await owenStaff.filter((e) => {
          return e.status === "แบบคำร้องไม่ถูกต้อง";
        });
        setPetitionsCancel(allPetitionsCancel);
        setStatusTab("รอเจ้าหน้าที่ตรวจสอบ");
      }
      setOpenReload(false);
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          marginLeft: "200px",
          marginTop: "30px",
          display: "block",
          justifyContent: "center",
          width: "75%",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openReload}
        >
          {" "}
          <CircularProgress color="inherit" />
        </Backdrop>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "150px",
            }}
          >
            <Card variant="outlined">{cardDate}</Card>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <Card variant="outlined">{cardCountUser}</Card>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <Card variant="outlined">{cardCountTeacher}</Card>
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          {user.role === "อาจารย์" ? (
            <Box
              sx={{
                width: "300px",
                height: "180px",
              }}
            >
              <Card variant="outlined">{cardAwiatApproveTeacher}</Card>
            </Box>
          ) : (
            ""
          )}
          {user.role === "หัวหน้าสาขา" ? (
            <Box
              sx={{
                width: "300px",
                height: "180px",
              }}
            >
              <Card variant="outlined">{cardAwiatApproveBranchHead}</Card>
            </Box>
          ) : (
            ""
          )}
          {user.role === "เจ้าหน้าที่สาขา" ? (
            <Box
              sx={{
                width: "300px",
                height: "180px",
              }}
            >
              <Card variant="outlined">{cardAwiatCheck}</Card>
            </Box>
          ) : (
            ""
          )}
          {user.role === "นักศึกษา" || user.role === "เจ้าหน้าที่สาขา" ? (
            <Box
              sx={{
                width: "300px",
                height: "180px",
              }}
            >
              <Card variant="outlined">{cardCountStudent}</Card>
            </Box>
          ) : (
            ""
          )}
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Div>{"แบบคำร้องทั้งหมด"}</Div>
                </TableCell>
                <TableCell colSpan={1}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ทังหมด
                    </InputLabel>
                    {user.role === "อาจารย์" || user.role === "หัวหน้าสาขา" ? (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusTab}
                        defaultValue="ทั้งหมด"
                        label="ทั้งหมด"
                        onChange={(event) => setStatusTab(event.target.value)}
                      >
                        <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                        <MenuItem value="รอเจ้าหน้าที่ตรวจสอบ">
                          รอเจ้าหน้าที่ตรวจสอบ
                        </MenuItem>
                        <MenuItem value="แบบคำร้องถูกต้อง">
                          แบบคำร้องถูกต้อง
                        </MenuItem>
                        <MenuItem value="ที่ปรึกษาอนุมัติแล้ว">
                          ที่ปรึกษาอนุมัติแล้ว
                        </MenuItem>
                        <MenuItem value="หัวหน้าสาขาอนุมัติแล้ว">
                          หัวหน้าสาขาอนุมัติแล้ว
                        </MenuItem>
                      </Select>
                    ) : (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={statusTab}
                        defaultValue="ทั้งหมด"
                        label="ทั้งหมด"
                        onChange={(event) => setStatusTab(event.target.value)}
                      >
                        <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                        <MenuItem value="รอเจ้าหน้าที่ตรวจสอบ">
                          รอเจ้าหน้าที่ตรวจสอบ
                        </MenuItem>
                        <MenuItem value="แบบคำร้องถูกต้อง">
                          แบบคำร้องถูกต้อง
                        </MenuItem>
                        <MenuItem value="แบบคำร้องไม่ถูกต้อง">
                          แบบคำร้องไม่ถูกต้อง
                        </MenuItem>
                        <MenuItem value="ที่ปรึกษาอนุมัติแล้ว">
                          ที่ปรึกษาอนุมัติแล้ว
                        </MenuItem>
                        <MenuItem value="หัวหน้าสาขาอนุมัติแล้ว">
                          หัวหน้าสาขาอนุมัติแล้ว
                        </MenuItem>
                      </Select>
                    )}
                  </FormControl>
                </TableCell>
                <TableCell colSpan={2}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="ค้นหาชื่อ-นามสกุล"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(event) => {
                        setSearchName(event.target.value);
                      }}
                    />
                  </Search>
                </TableCell>
                {user.role === "นักศึกษา" ? (
                  <TableCell colSpan={1} align="right">
                    <BootstrapTooltip
                      title="เพิ่มแบบคำร้อง"
                      onClick={handleClickOpen}
                    >
                      <Fab color="primary" aria-label="add">
                        <NoteAddIcon sx={{ fontSize: 30 }} color="white" />
                      </Fab>
                    </BootstrapTooltip>
                  </TableCell>
                ) : (
                  <TableCell colSpan={1} align="right"></TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell width={250} align="center">
                  ชื่อแบบคำร้อง
                </TableCell>
                <TableCell
                  onClick={() => sorting("createdAt")}
                  width={150}
                  align="center"
                  style={{ cursor: "pointer" }}
                >
                  วันที่ส่งแบบคำร้อง
                </TableCell>
                <TableCell width={250} align="center">
                  ผู้ยื่น
                </TableCell>
                <TableCell width={200} align="center">
                  ชั้นเรียน
                </TableCell>
                <TableCell width={200} align="center">
                  สถานะ
                </TableCell>
                <TableCell width={120} align="center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPosts
                .filter((val) => {
                  if (statusTab === "ทั้งหมด") {
                    return val;
                  } else if (
                    val.status.toLowerCase().includes(statusTab.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((value) => {
                  if (
                    value.from.name
                      .toLowerCase()
                      .includes(searchName.toLowerCase()) ||
                    value.from.lastname
                      .toLowerCase()
                      .includes(searchName.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((pettion) => (
                  <TableRow
                    key={pettion._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pettion.petitionName}
                    </TableCell>
                    <TableCell align="center">
                      {moment(
                        pettion.createdAt,
                        moment.HTML5_FMT.DATETIME_LOCAL_MS
                      )
                        .add(543, "year")
                        .format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {pettion.from.prefix}
                      {pettion.from.name} {pettion.from.lastname}
                    </TableCell>
                    <TableCell align="center">
                      {pettion.class.classRoom}
                    </TableCell>
                    {pettion.status === "รอเจ้าหน้าที่ตรวจสอบ" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "หัวหน้าสาขาอนุมัติแล้ว" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#009933",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "แบบคำร้องถูกต้อง" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : pettion.status === "ที่ปรึกษาอนุมัติแล้ว" ? (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff9900",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        {" "}
                        <div
                          style={{
                            backgroundColor: "#ff3300",
                            width: "100%",
                            borderRadius: "5px",
                          }}
                        >
                          <p
                            style={{
                              color: "white",
                              fontSize: "14px",
                              padding: "5px",
                            }}
                          >
                            {pettion.status}
                          </p>
                        </div>
                      </TableCell>
                    )}

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          sx={{ color: "orange" }}
                          aria-label="delete"
                          onClick={() =>
                            navigate(`/petition/edit/${pettion._id}`)
                          }
                        >
                          <EditIcon sx={{ fontSize: 30 }} />
                        </IconButton>
                        {/* <IconButton
                          sx={{ color: "red" }}
                          aria-label="delete"
                          onClick={() => handlePetitionDelete(pettion._id)}
                        >
                          <DeleteIcon sx={{ fontSize: 30 }} />
                        </IconButton> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <nav style={{ marginTop: 10 }}>
          <ul className="pagination">
            {pageNumber.map((number) => (
              <li
                style={{ marginRight: 10 }}
                key={number}
                className="page-item"
              >
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CreatePetition handleClose={handleClose} open={open} />
      </div>
    </>
  );
};

export default Petition;
