// "use client";

// import { useEffect, useState } from "react";

// const { useSession } = require("next-auth/react");

// function tokenInfo() {
//   const { data: session, status } = useSession();
//   const [statusInfo, setStatus] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     setStatus(status);

//     if (status === "authenticated") {
//       setUser(session.user);
//     }
//   }, [status, session]);

//   return { statusInfo, user };
// }

// export default tokenInfo;
