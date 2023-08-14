import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const Teachersdata = (role1, role2, callback) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "in", [role1, role2]));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
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

    callback(users); // Call the provided callback with the updated data
  });

  return unsubscribe; // Return the unsubscribe function
};

export default Teachersdata;
