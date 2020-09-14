const users = [];

const addUsers = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const userExists = users.find((user) => {
    user.name === name && user.room === room;
  });
  if (userExists) {
    return {
      error:
        "Sorry! This username is already taken:( Please try something unique ^ ^",
    };
  }

  const user = { id, name, room };

  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const findUser = users.findIndex((user) => {
    user.id === id;
  });
  if (findUser != -1) {
    users.splice(findUser, 1)[0];
    return users;
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUsers, removeUser, getUser, getUserRoom };
