import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

const Teachersdata = async (role) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", role));
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(q);
      const Users = [];
      
      querySnapshot.forEach((doc) => {
          const userData = doc.data();
          Users.push(userData);
        });
        setUsers(Users);
    }
    getData();

    }, [q]);
  return users;
};

export default Teachersdata;
