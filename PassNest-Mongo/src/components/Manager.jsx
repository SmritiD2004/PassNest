import { TbLockPassword } from "react-icons/tb";
import { FaCopy } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showpassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    // Toggle the icon based on the current state
    if (
      ref.current.src.includes(
        "https://img.icons8.com/ios-filled/50/000000/visible.png"
      )
    ) {
      ref.current.src =
        "https://img.icons8.com/ios-filled/50/000000/invisible.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src =
        "https://img.icons8.com/ios-filled/50/000000/visible.png";
    }
  };

  const savePasswords = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newPassword = { ...form, id: uuidv4() };

      setPasswordArray([...passwordArray,newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      // Otherwise clear the form and show toast
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      setForm({ site: "", username: "", password: "" });
      toast("Password saved successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };

  const deletePasswords = async (id) => {
    
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPasswords = (id) => {
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className="p-3 md:container px-40 py-16 mx-auto min-h-[88.2vh]">
        <h1 className=" text-4xl text-center font-semibold text-white">
          <span className="text-green-700">&lt;</span>
          PassNest
          <span className="text-green-700">/&gt;</span>
        </h1>
        <p className="font-semibold text-lg text-green-700 text-center">
          Your Own Password manager
        </p>
        <div className="flex flex-col text-black gap-8 p-4 items-center">
          <input
            className="rounded-full border border-white w-full bg-amber-50 p-4 py-1"
            type="email"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              type="text"
              className="border border-white w-full bg-amber-50 rounded-full p-4 py-1 "
              name="username"
              id="username"
              value={form.username}
              placeholder="Enter Username"
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                ref={passwordRef}
                type="password"
                className="border border-white w-full bg-amber-50 rounded-full p-4 py-1"
                name="password"
                id="password"
                value={form.password}
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showpassword}
              >
                {/* <img ref={ref}
                  src="https://img.icons8.com/ios-filled/50/000000/visible.png"
                  alt="visible"
                  className="w-6 h-6"
                /> */}
              </span>
            </div>
          </div>

          <button
            onClick={savePasswords}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-700 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <TbLockPassword />
            Add password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-white">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-white"> No passwords saved yet</div>
          )}
          {passwordArray.length != 0 && (
            <table className="w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white border-green-950">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index} className="border-b border-green-300">
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-5 cursor-pointer w-25px h-25px px-1 py-1"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <FaCopy />
                          </div>
                        </div>
                      </td>

                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="size-5 cursor-pointer w-25px h-25px px-1 py-1"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <FaCopy />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="size-5 cursor-pointer w-25px h-25px px-1 py-1"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <FaCopy />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white flex items-center justify-center">
                        <span
                          className="cursor-pointer"
                          onClick={() => editPasswords(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/cbtlerlm.json"
                            trigger="hover"
                            state="hover-line"
                            style={{ width: "27px", height: "27px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() => deletePasswords(item.id)}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/sxhqklqh.json"
                            trigger="morph"
                            state="morph-trash-in"
                            style={{ width: "27px", height: "27px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
