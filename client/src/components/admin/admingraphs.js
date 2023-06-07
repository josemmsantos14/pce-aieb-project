import { React, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function AdminGraphs() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const user_intro = localStorage.getItem("user");
  const user = JSON.parse(user_intro);
  const userName = user.UserName;
  const userType = user.UserType;

  const baseURL = "http://localhost:8080/adminpage/listFhirMessages";

  const [fhirMsgList, setFhirMsgList] = useState([]);
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setFhirMsgList(response.data);
    });
  }, []);

  const handleLogout = async () => {
    setEmail("");
    setPassword("");
    setMsg("");
    navigate("/login");
    localStorage.clear();
  };

  const occurrences = [];

  // Iterate through the fhirMsgList
  for (const entry of fhirMsgList) {
    const date = entry.fhirMessage["entry.3.entry.period.end.date"];

    // Find the index of the entry in the occurrences list
    const index = occurrences.findIndex((item) => item.date === date);

    // If the date is already in the occurrences list, increment the count
    if (index !== -1) {
      occurrences[index].count++;
    } else {
      // Otherwise, add a new dictionary with date and count set to 1
      occurrences.push({ date: date, count: 1 });
    }
  }

  console.log("occu: ", occurrences);

  occurrences.sort(function(a, b) {
    var keyA = new Date(a.date),
      keyB = new Date(b.date);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  //   const data = [
  //     { name: "Mon", uv: 4000, pv: 2400, amt: 2400, week: "Week 1" },
  //     { name: "Tue", uv: 3000, pv: 1398, amt: 2210, week: "Week 1" },
  //     { name: "Wed", uv: 2000, pv: 9800, amt: 2290, week: "Week 1" },
  //     { name: "Thu", uv: 2780, pv: 3908, amt: 2000, week: "Week 1" },
  //     { name: "Fri", uv: 1890, pv: 4800, amt: 2181, week: "Week 1" },
  //     { name: "Sat", uv: 2390, pv: 3800, amt: 2500, week: "Week 1" },
  //     { name: "Sun", uv: 3490, pv: 4300, amt: 2100, week: "Week 1" },
  //   ];

  return (
    <div className="main-container">
      <navbar className="navbar">
        <h2 className="navbar-title">
          <span>N</span>
          <span>A</span>
        </h2>
        <ul className="navbar-left-items">
          <li>
            <Link to="/adminpage">Forms</Link>
          </li>
          <li>
            <Link to="/adminpage/graphs">Graphs</Link>
          </li>
        </ul>
        <div className="navbar-right-items">
          <div className="user-creds">
            <h5 className="user-name">{userName}</h5>
            <h5 className="user-type">{userType}</h5>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-logout"
          >
            Logout
          </button>
        </div>
      </navbar>
      <div className="body">
      <div className="graph-container auth-form-container">
        <h2>Gráfico data vs nº relatórios de alta</h2>
        <LineChart
          width={1200}
          height={300}
          data={occurrences}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0000FF"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          <CartesianGrid strokeDasharray="3 3"  />
          <XAxis dataKey="date" />
          <YAxis/>
          <Tooltip />
          <Legend />
        </LineChart>
      </div>
      </div>
    </div>
  );
}

export default AdminGraphs;
