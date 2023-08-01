import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Teachersdata = async (role1,role2) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "in", [role1, role2]));
  const querySnapshot = await getDocs(q);
  const users = [];

  querySnapshot.forEach((doc) => {
    const userData = doc.data();
    // Include the userId in the user object
    const user = {
      userId: doc.id,
      ...userData,
    };
    users.push(user);
  });
  
  return users;
};

export default Teachersdata;
