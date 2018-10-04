import { AsyncStorage } from "react-native";

class UserResource {
  static setUser(user) {
    // console.log("set user", user);
    return AsyncStorage.setItem("user", JSON.stringify(user));
  }

  static getUser() {
    return AsyncStorage.getItem("user").then(user => JSON.parse(user));
  }
}

export default UserResource;
