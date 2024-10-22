import { Outlet } from "react-router-dom";

import DashHeader from "./DashHeader";

export default function Dashboard() {
  return (
    <div className="w-[95%] lg:w-[80%] mx-auto flex items-start text-white">
      <DashHeader>
        <Outlet />
      </DashHeader>
    </div>
  );
}

// ["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//   <ListItem key={text} disablePadding>
//     <ListItemButton>
//       <a href="http://">{text}</a>
//     </ListItemButton>
//   </ListItem>
// ))

{
  /* <div>
          <img className="mx-auto my-8" src={logo} alt="" />
        </div> */
}
