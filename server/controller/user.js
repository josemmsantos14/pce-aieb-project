let UserModel = require("../model/user");

module.exports.newUser = async (
  userID,
  userName,
  userEmail,
  userPassword,
  userType
) => {
  try {
    let user = new UserModel({
      userID,
      userName,
      userEmail,
      userPassword,
      userType,
    });
    let response = await user.save();
    return { success: true, response };
  } catch (err) {
    console.log(err);
    return { success: false, response: err };
  }
};

module.exports.listUsers = async () => {
  try {
    let user = await UserModel.find({});
    console.log(user);
    return { success: true, response: sensor };
  } catch (err) {
    console.log(err);
    return { success: false, response: err };
  }
};


// acrescentar função para validar credenciais e depois substituir no routes/login.js a maior parte da lógica que lá está por esta função
