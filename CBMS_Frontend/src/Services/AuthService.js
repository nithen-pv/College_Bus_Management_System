const AuthService = {
  login: (user) => {
    return fetch("/api/user/userLogin", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return { isAuthenticated: false, user: { username: "", userType: "" } };
    });
  },
  register: (user) => {
    return fetch("/api/user/userRegister", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: (user) => {
    return fetch("/api/user/userLogout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/api/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return { isAuthenticated: false, user: { username: "", userType: "" } };
    });
  },
};

export default AuthService;
