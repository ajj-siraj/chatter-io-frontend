import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { Ctx } from "../Context";

function UserList({ users }) {
  let owner = useContext(Ctx).state.username;
  console.log("users: ", users);
  return (
    <div>
      {users.map((user, idx) => (
        <div
          className={`userlist ${user === owner ? `userlist-owner` : `userlist-user`}`}
          key={`user-${idx}`}
        >
          {user}
        </div>
      ))}
    </div>
  );
}

export default UserList;
