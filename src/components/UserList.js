import React from "react";

function UserList({ users, username }) {
  //reorder userlist to place current user at the top
  let userList = users.filter((user) => user !== username);
  userList.unshift(username);

  return (
    <div>
      {userList.map((user, idx) => (
        <div
          className={`userlist ${user === username ? `userlist-owner` : `userlist-all`}`}
          key={`user-${idx}`}
        >
          {user}
        </div>
      ))}
    </div>
  );
}

export default UserList;
