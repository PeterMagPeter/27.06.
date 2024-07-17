import { Button, Container, Form } from "react-bootstrap";
import Header from "../components/Header/Header";
import { useState } from "react";
import { UserResource } from "../Resources";
import { putUser } from "../backendAPI/userAPI";
import Pic from "../assets/pictures/profile_pic_placeholder.png";
import { useSelector } from "react-redux";
import styles from "./PageProfile.module.css";
/**
 *
 * Add: settings route for browser navigation
 */
export default function EditProfile() {
  const nick = useSelector((state: any) => state.userReducer.username);
  const email = useSelector((state: any) => state.userReducer.email);

  let user: UserResource = {
    email: email,
    username: nick,
    password: "secure1",
  };
  const [userData, setUserData] = useState<UserResource>(user);

  const [edit, setEdit] = useState<string>("");

  async function updateUser() {
    const updatedUser = await putUser(user);
    setUserData(updatedUser);
  }
  return (
    <>
      <Header />
      <div className={styles.profilePage}>
        <div className={styles.profileDiv}>
          <img
            className={styles.settingsImg}
            src={Pic}
            onClick={() => (edit == "" ? setEdit("picClick") : setEdit(""))}
          />
          <br />
          {edit == "picClick" && (
            <button
              className={styles.settingsButton}
              onClick={() => setEdit("pic")}
            >
              Change
            </button>
          )}
          {edit == "pic" && (
            <>
              <input className={styles.inputField} type="file"></input>
              <br />
              <button
                onClick={() => updateUser()}
                className={styles.settingsButton}
              >
                Save
              </button>
              <button
                onClick={() => setEdit("")}
                className={styles.logoutButton}
              >
                Cancel
              </button>
            </>
          )}
          <hr />
          <label>
            <b>E-mail: </b>
            {user.email}
          </label>
          <br />
          {edit == "email" ? (
            <>
              <input
                className={styles.inputField}
                type="email"
                placeholder="Change e-mail adress"
              ></input>
              <br />
              <button
                onClick={() => {
                  updateUser();
                  setEdit("");
                }}
                className={styles.settingsButton}
              >
                Save changes
              </button>
              <button
                onClick={() => setEdit("")}
                className={styles.logoutButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit("email")}
              className={styles.settingsButton}
            >
              Change e-mail adress
            </button>
          )}
          <hr />
          {edit == "password" ? (
            <>
              <input
                className={styles.inputField}
                type="password"
                placeholder="Old password"
              ></input>
              <br />
              <input
                className={styles.inputField}
                type="password"
                placeholder="New password"
              ></input>
              <br />
              <input
                className={styles.inputField}
                type="password"
                placeholder="Confirm new password"
              ></input>
              <br />
              <button
                onClick={() => {
                  updateUser();
                  setEdit("");
                }}
                className={styles.settingsButton}
              >
                Save changes
              </button>
              <button
                onClick={() => setEdit("")}
                className={styles.logoutButton}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEdit("password")}
              className={styles.logoutButton}
            >
              Change account password
            </button>
          )}
        </div>
      </div>
    </>
  );
}
