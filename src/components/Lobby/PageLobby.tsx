import { Badge } from "react-bootstrap";
import Header from "../Header/Header";
import styles from "./PageLobby.module.css";
import { useNavigate } from "react-router-dom";
import socket from "../Websocket/socketInstance";
import { hostSettings, setLobby, setRoomId } from "../reducer/LobbyReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PageLobby() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let username = useSelector((state: any) => state.userReducer.username);
  const [games, setGames] = useState<hostSettings[]>();
  const [gameMode, setGameMode] = useState<string>("");
  const [roomInput, setRoomInput] = useState<string>("");
  const [joinWarning, setJoinWarning] = useState(false);
  //placeholders------------------ change to hostSettings interface in future

  function deleteAllRooms(): void {
    socket.emit("sendCloseAllRooms");
  }
  function joinLobby(newRoomId: string): void {
    dispatch(
      setRoomId({
        roomId: newRoomId,
      })
    );
    navigate("/onlineGameSettings");
  }
  function checkLobby() {
    socket.emit("sendExistRoom", roomInput, username);

  }
  useEffect(() => {
    socket.emit("sendGetLobbies", gameMode);

    return () => {};
  }, []);

  useEffect(() => {
    // websocket connects to server
    if (!socket) return;
    socket.on("getLobbies", (body: hostSettings[]) => {
      setGames(body);
    });
    socket.on("roomExists", (newRoomId: string) => {
      joinLobby(newRoomId);
      setJoinWarning(false);
    });
    socket.on("NietRoom", (newRoomId: string) => {

    setJoinWarning(true);
    
    });
    return () => {};
  }, [socket]);

  function joinGame(
    roomId: string,
    privateMatch: boolean,
    gameMode: string,
    hostName: string,
    maxPlayers: number,
    superWeapons: boolean
  ): void {
    dispatch(
      setLobby({
        roomId: roomId,
        privateMatch: privateMatch,
        gameMode: gameMode,
        hostName: hostName,
        maxPlayers: maxPlayers,
        superWeapons: superWeapons,
      })
    );
    navigate("/onlineGameSettings");
  }
  function getLobbies() {
    socket.emit("sendGetLobbies", gameMode); // zu gamemode variable ändern
  }

  //------------------------------

  return (
    <>
      <Header />
      <div className={styles.lobbyPage}>
        <div className={styles.getLobbiesDiv}>
          <select
            className={styles.formElement}
            onChange={(event) => {
              let newMode = event.target.value;
              if (newMode === "All") newMode = "";
              setGameMode(newMode);
            }}
          >
            <option>All</option>
            <option>1vs1</option>
            {/* <option>FFA</option> */}
            <option>Team</option>
            {/* <option>3</option> */}
          </select>
          <br />
          <button className={styles.lgButton} onClick={getLobbies}>
            get Lobbies
          </button>
        </div>
        <div className={styles.joinRoomDiv}>
          <div>
            <label className={styles.lobbyText}>Join via room-ID</label>
            <br />
            <input
              type="text"
              className={styles.formElement}
              placeholder="Room ID"
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
            />
            &nbsp;&nbsp;
            <button
              // type="submit"
              className={styles.smButton}
              onClick={() => checkLobby()}
            >
              Join
            </button>
          </div>
          {joinWarning ? (
            <p className={styles.joinWarning}>This room-ID does not exist.</p>
          ) : (
            <p></p>
          )}
        </div>
        <div className={styles.lobbyContent}>
          <h1 className={styles.lobbyTitle}>Lobbies</h1>
          <div className={styles.gameCards}>
            {games?.map((game: hostSettings) => (
              <div className={styles.gameCard}>
                <h4 className={styles.gameTitle}>
                  Game <b>{game.roomId}</b>&nbsp;&nbsp;&nbsp;&nbsp;Host:{" "}
                  {game.hostName}
                </h4>
                <hr />
                <h5 className={styles.gameText}>
                  Players: {game.players?.length}/{game.maxPlayers}, time:{" "}
                  {game.shotTimer} min
                </h5>
                <hr />
                {game.players?.length != game.maxPlayers && (
                  <button
                    className={styles.gameCardFooterButton}
                    onClick={() =>
                      joinGame(
                        game.roomId!,
                        game.privateMatch,
                        game.gameMode,
                        game.hostName,
                        game.maxPlayers,
                        game.superWeapons
                      )
                    }
                  >
                    Join
                  </button>
                )}
                <button className={styles.gameCardFooterButton} disabled={true}>
                  Watch
                </button>
                <Badge className={styles.watchBadge} bg="warning" text="dark">
                  Soon
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
