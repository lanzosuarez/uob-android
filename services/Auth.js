import axios from "axios";

import { generateUrl } from "../global";

class AuthService {
  static createAccount(data) {
    return axios(generateUrl("signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        data
      }
    });
  }

  static signIn(data) {
    return axios(generateUrl("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        data
      }
    });
  }

  static activateAccount(data) {
    return axios(generateUrl("activate"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        data
      }
    });
  }

  static forgotPassword(payload) {
    return axios(generateUrl("passwords"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        user: payload
      }
    });
  }

  static resendPin(data) {
    return axios(generateUrl("resend_pin"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        data
      }
    });
  }
}

export default AuthService;
