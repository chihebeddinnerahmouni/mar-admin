import TableUsers from '../components/users/TableUsers';
import UserStat from '../components/users/UsersStat';
import { FaUsers } from "react-icons/fa";
import { GiCaptainHatProfile } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from 'react';
import LoadingLine from '../components/ui/LoadingLine';





const Users = () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const url = import.meta.env.VITE_SERVER_URL_USERS;

  useEffect(() => {
    axios.get(url + "/admin/user/users?block=false&suspend=false")
      .then((res) => {
      // console.log(res.data);
        setLoading(false);
        setUsers(res.data);
    });
  }, []);
  



  if (loading) { 
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }




    return (
      <div className="p-4 md:p-8 lg:max-w-[1100px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
        <div className="">
          <h1 className="text-2xl md:text-4xl font-bold">User Management</h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage all the users in the system
          </p>
        </div>

        <div className="stats my-4 flex gap-2 overflow-auto py-1">
          {users_array().map((user) => (
            <UserStat key={user.id} Item={user} />
          ))}
        </div>
        <TableUsers users={users} />
      </div>
    );
}

export default Users;


const users_array = () => [
  {
    id: 1,
    title: "Total users",
    icon: FaUsers,
    number: 1000,
    growth: 10,
    state: "up",
    from: "last month",
    color: "#8280FF",
    bgColor: "#ECE9FF",
  },
  {
    id: 2,
    title: "Total Captains",
    icon: GiCaptainHatProfile,
    number: 100,
    growth: 5,
    state: "down",
    from: "last month",
    color: "FEC53D",
    bgColor: "#FFECE9",
  },
  {
    id: 3,
    title: "Total Users",
    icon: FaUser,
    number: 900,
    growth: 5,
    state: "down",
    from: "last month",
    color: "#4AD991",
    bgColor: "#E9FFE9",
  },
];
