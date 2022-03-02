//React Redux
import { useSelector } from "react-redux";
//Materail
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "./Home.css";

const Home = () => {
  //Materail Content
  const drawerWidth = 240;

  return (
    <div
      style={{
        display: "flex",
        margin: "20px 0px 0px 200px",
        justifyContent: "flex-start",
        width: "75%",
        backgroundColor: "#FFF",
      }}
    >
      <div style={{ margin: 30 }}>
        <Typography variant="h4" component="h4">
          ดาวน์โหลดเอกสาร
        </Typography>
        <Typography mt={2} variant="h8" component="h6">
          แบบคำร้องทั่วไป
        </Typography>
        <Typography mt={1} variant="h8" component="h6">
          <a
            style={{ textDecoration: "none" }}
            href="https://bus.rmutp.ac.th/wp-content/uploads/2019/05/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%82%E0%B8%AD-%E0%B9%80%E0%B8%9E%E0%B8%B4%E0%B9%88%E0%B8%A1-%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%99-%E0%B8%96%E0%B8%AD%E0%B8%99%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%A5%E0%B8%87%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%99.pdf"
            target="_blank"
          >
            – แบบขอ เพิ่ม เปลี่ยน ถอนการลงทะเบียน
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default Home;
