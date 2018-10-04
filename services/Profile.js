import axios from "axios";

import { generateUrl } from "../global";
import UserResource from "./UserResource";

class Profile {
  static async getProfile() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("profile"), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async getCourses(type) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl("profile"), {
      headers: {
        Authorization: authentication_token
      },
      params: {
        type
      }
    });
  }

  static async updateProfile(data, id) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`profile/${id}`), {
      method: "PUT",
      headers: {
        Authorization: authentication_token
      },
      data: {
        data
      }
    });
  }

  static async changePassword(data) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`change_password`), {
      method: "POST",
      headers: {
        Authorization: authentication_token
      },
      data: {
        data
      }
    });
  }

  static async getLastEventBatch() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`digital_signatures/new`), {
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async getCourseBookings() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`user_events`), {
      params: { employee_events: true },
      headers: {
        Authorization: authentication_token
      }
    });
  }

  static async confirmBooking(status, id) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`user_events/${id}`), {
      method: "PUT",
      params: { employee_events: true },
      headers: {
        Authorization: authentication_token
      },
      data: {
        data: {
          status
        }
      }
    });
  }

  static async signAttendance(data) {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`digital_signatures`), {
      method: "POST",
      headers: {
        Authorization: authentication_token
      },
      data: {
        data
      }
    });
  }

  static async logout() {
    const { authentication_token } = await UserResource.getUser();
    return axios(generateUrl(`logout`), {
      method: "POST",
      headers: {
        Authorization: authentication_token
      }
    });
  }
}

export default Profile;
