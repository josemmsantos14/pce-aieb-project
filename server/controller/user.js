let UserModel = require("../model/user");

module.exports.newUser = async ( UserName, UserEmail, UserPassword, UserType ) => {
  try {
    let user = new UserModel({
      UserName,
      UserEmail,
      UserPassword,
      UserType,
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
module.exports.getUserByEmailAndPassword = async (email, password) => {
  try {
    // console.log(email, password);
    let user = await UserModel.findOne({ UserEmail: email, UserPassword: password });
    console.log(user)
    if (!user) {
      return {exists: false};
    }
    return {exists: true, response: user};
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}


module.exports.findUserByEmail = async (email) => {
  try {
    let user = await UserModel.findOne({UserEmail: email});
    if (!user) {
      return {exists: false};
    }
    return {exists: true, response: user};
  } catch (err) {
      console.log(err);
      return {exists: false, response: err};
  }
}