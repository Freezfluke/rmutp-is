import DashboardNav from "../components/DashboardNav";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        margin: "20px 0px 0px 200px",
        justifyContent: "space-between",
        width: "70%",
      }}
    >
      <DashboardNav />
    </div>
  );
};

export default Dashboard;
