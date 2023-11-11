// import { useContext } from "react";
// import { UserContext } from "../../context/userContext";

// export default function Dashboard() {
//   const { user } = useContext(UserContext);
//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {!!user && <h2>Welcome, {user.username}</h2>}
//     </div>
//   );
// }

import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  // console.log("chuj");
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, []);
  // const { user } = useContext(UserContext);
  // console.log(user);
  // if (!user) {
  //   navigate("/login", { replace: true });
  // }
  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome</h2>
      {/* {console.log("chuj")} */}
    </>
  );
}
