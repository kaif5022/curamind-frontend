import axios from "axios";

async function test() {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: "jsnjnsj@gmail.com",
      password: "password123"
    });
    console.log("Success:", res.data);
  } catch (err) {
    console.error("Error:", err.response?.status, err.response?.data);
  }
}

test();
