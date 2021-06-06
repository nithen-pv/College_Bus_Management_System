import Axios from "./axios";
import axios from "axios";

// Custom Headers

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
// };
const Services = {
  // Student Services

  getStudents: () => {
    return Axios.get("/student").then((response) => {
      if (response.status !== 401) {
        return response;
      } else {
        return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      }
    });
  },

  createStudent: (studentData) => {
    return Axios.post("/student", studentData).then((response) => {
      if (response.status !== 401) return response;
      else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
    });
  },

  deleteStudent: async (studentID, username) => {
    return axios
      .all([
        await Axios.delete("/student/" + studentID),
        await Axios.delete("/user/username/" + username),
      ])
      .then(
        axios.spread((...response) => {
          if (response[0].status !== 401 && response[1].status !== 401) {
            return { message: "Student and Student account deleted" };
          } else {
            return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
          }
        })
      );
  },

  editStudent: async (studentID, studentData, username) => {
    return axios
      .all([
        await Axios.patch("/student/" + studentID, studentData),
        await Axios.patch("/user/" + username, {
          username: studentData.username,
        }),
      ])
      .then(
        axios.spread((...response) => {
          if (response[0].status !== 401 && response[1].status !== 401) {
            return { message: "Student  Details Updated" };
          } else {
            return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
          }
        })
      );
  },

  // deleteUser: (username) => {
  //   return Axios.delete("/user/" + username).then((response) => {
  //     if (response.status !== 401) return response;
  //     else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
  //   });
  // },

  // Bus Services
  getBusDetails: () => {
    return Axios.get("/bus")
      .then((response) => {
        if (response.status !== 401) {
          return response;
        } else {
          return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
        }
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  getBusByUser: (username) => {
    return Axios.get("/bus/busDriver/" + username)
      .then((response) => {
        if (response.status !== 401) {
          return response;
        } else {
          return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
        }
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  createBus: (busData) => {
    return Axios.post("/bus", busData)
      .then((response) => {
        if (response.status !== 401) return response;
        else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  // editBus: (busID, busData) => {
  //   return Axios.patch("/bus/" + busID, busData)
  //     .then((response) => {
  //       if (response.status !== 401) return response;
  //       else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
  //     })
  //     .catch((err) => {
  //       return { message: "Error Ocurred", error: err };
  //     });
  // },

  editBus: async (busID, busData, username) => {
    return axios
      .all([
        await Axios.patch("/bus/" + busID, busData),
        await Axios.patch("/user/" + username, {
          username: busData.username,
        }),
      ])
      .then(
        axios.spread((...response) => {
          if (response[0].status !== 401 && response[1].status !== 401) {
            return { message: "Bus Details Updated" };
          } else {
            return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
          }
        })
      );
  },

  deleteBus: async (busID, username) => {
    return axios
      .all([
        await Axios.delete("/bus/" + busID),
        await Axios.delete("/user/username/" + username),
      ])
      .then(
        axios.spread((...response) => {
          if (response[0].status !== 401 && response[1].status !== 401) {
            return { message: "Bus and bus driver account deleted" };
          } else {
            return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
          }
        })
      );
  },

  // Staff Services
  getStaffs: () => {
    return Axios.get("/user/staff")
      .then((response) => {
        if (response.status !== 401) {
          return response;
        } else {
          return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
        }
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },
  createStaff: (busData) => {
    return Axios.post("/bus", busData)
      .then((response) => {
        if (response.status !== 401) return response;
        else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },
  deleteStaff: (staffID) => {
    return Axios.delete("/user/" + staffID)
      .then((response) => {
        if (response.status !== 401) return response;
        else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  // Program Services
  getProgram: () => {
    return Axios.get("/program")
      .then((response) => {
        if (response.status !== 401) {
          return response;
        } else {
          return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
        }
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  deleteProgram: (programID) => {
    return Axios.delete("/program/" + programID)
      .then((response) => {
        if (response.status !== 401) return response;
        else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  createProgram: (programName) => {
    return Axios.post("/program", { programName: programName })
      .then((response) => {
        if (response.status !== 401) return response;
        else return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
      })
      .catch((err) => {
        return { message: "Error Ocurred", error: err };
      });
  },

  getCount: () => {
    return axios
      .all([
        Axios.get("/student/count"),
        Axios.get("/program/count"),
        Axios.get("/bus/count"),
        Axios.get("/user/countStaff"),
      ])
      .then(
        axios.spread((...response) => {
          if (response[0].status !== 401 && response[1].status !== 401) {
            return { message: "Get count Details", data: response };
          } else {
            return { message: { msgBody: "UnAuthorized" }, msgErroe: true };
          }
        })
      );
  },
};

export default Services;
