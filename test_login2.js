import axios from "axios";

async function test() {
  try {
    const reg = await axios.post("http://localhost:5000/api/auth/register", {
      name: "Test Doctor",
      email: "jsnjnsj@gmail.com",
      password: "password123",
      role: "doctor"
    });
    console.log("Reg Success:", reg.data);

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: "jsnjnsj@gmail.com",
      password: "password123"
    });
    console.log("Login Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response?.status, err.response?.data);
  }
}

test();
