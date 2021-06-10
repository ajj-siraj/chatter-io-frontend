import React from "react";


function UserList({ users, username }) {

  return (
    <div>
      {users.map((user, idx) => (
        <div
          className={`userlist ${user === username ? `userlist-owner` : `userlist-user`}`}
          key={`user-${idx}`}
        >
          {user}
        </div>
      ))}
    </div>
  );
}

export default UserList;
