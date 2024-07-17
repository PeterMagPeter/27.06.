import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import Header from "../Header/Header";
import styles from "./GameSettings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLobby, setLobby } from "../reducer/LobbyReducer";
import socket from "../Websocket/socketInstance";
import { hostSettings } from "../reducer/LobbyReducer";
import { hostname } from "os";

export default function GameSettings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isHost: boolean = true;
  let username = useSelector((state: any) => state.userReducer.username);
  let privateMatch = useSelector(
    (state: any) => state.lobbyReducer.privateMatch
  );
  let reducerRoomId = useSelector((state: any) => state.lobbyReducer.roomId);
  let reducerHostName = useSelector(
    (state: any) => state.lobbyReducer.hostName
  );
  const [hostName, setHostname] = useState<string>(username);
  let roomId = useRef<string | null>(generateRoomId());
  const [maxPlayers, setMaxPlayers] = useState<number>(2);
  const [privateGame, setPrivate] = useState<boolean>(false);
  const [gameMap, setGameMap] = useState<string>("normal");
  const [gameMode, setGameMode] = useState<string>("1vs1");
  const [players, setPlayers] = useState<string[]>([hostName]);
  const [superWeapons, setSuperWeapons] = useState<boolean>(true);
  const [shotTimer, setShotTimer] = useState<number>(10);
  const [createdRoom, setCreatedRoom] = useState<boolean>(false);

  // const gameSettings = {
  //   roomId,
  //   players,
  //   username,
  //   maxPlayers,
  //   private: privateGame,
  //   shotTimer,
  // };

  useEffect(() => {
    if (username !== reducerHostName)
      socket.emit("sendJoinRoom", reducerRoomId, username);

    return () => {};
  }, []);

  //Web Socket -> send gameSettings to backend

  // Generate unique room id
  function generateRoomId(): string {
    const currentTime = Date.now();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const roomId2 = currentTime + randomNumber;
    return JSON.stringify(roomId2);
  }

  function handleSaveSettings(): void {
    let body: hostSettings = {
      roomId: roomId.current,
      privateMatch: privateGame,
      maxPlayers: maxPlayers,
      gameMap: gameMap,
      // password?: string,
      gameMode: gameMode,
      hostName: username,
      players: players,
      superWeapons: superWeapons,
      shotTimer: shotTimer,
    };
    dispatch(
      setLobby({
        roomId: roomId.current,
        privateMatch: privateGame,
      })
    );
    if (!createdRoom) socket.emit("sendHostLobby", body);
    else socket.emit("sendHostUpdatedLobby", body);
  }
  useEffect(() => {
    // websocket connects to server
    if (!socket) return;
    socket.on("createdRoom", () => {
      setCreatedRoom(true);
      setHostname(username);
    });
    socket.on("playerJoinedRoom", (body: hostSettings) => {
      console.log(JSON.stringify(body));
      setEverything(body);
    });
    socket.on("startShipPlacement", () => {
      navigate("/shipplacement");
    });
    socket.on("updatedLobby", (body: hostSettings) => {
      setEverything(body);
    });
    socket.on("playerKicked", (playerName: string) => {
      if (playerName && playerName === username) goBack();
    });
    return () => {};
  }, [socket]);
  // function to set everything lol
  function setEverything(body: hostSettings) {
    setPlayers(body.players);
    console.log(JSON.stringify(body));
    setHostname(body.hostName);
    setGameMap(body.gameMap);
    setGameMode(body.gameMode);
    setMaxPlayers(body.maxPlayers);
    // console.log(body.roomId, " roomid after joining")
    // roomId.current = body.roomId;
    setSuperWeapons(body.superWeapons);
    setShotTimer(body.shotTimer);
    setPrivate(body.privateMatch);
    dispatch(
      setLobby({
        roomId: body.roomId,
        privateMatch: privateGame,
      })
    );
  }
  function startGame(): void {
    socket.emit("sendStartShipPlacement", roomId.current);
  }

  function goBack(): void {
    // delete every state
    socket.emit("sendLeaveRoom", reducerRoomId);
    dispatch(deleteLobby());
    navigate("/online");
  }

  function kickPlayer(playerName: string): void {
    let body: hostSettings = {
      roomId: roomId.current,
      privateMatch: privateGame,
      maxPlayers: maxPlayers,
      gameMap: gameMap,
      // password?: string,
      gameMode: gameMode,
      hostName: username,
      players: players,
      superWeapons: superWeapons,
      shotTimer: shotTimer,
    };
    socket.emit("sendHostUpdatedLobby", body, playerName);
  }

  return (
    <>
      <Header />
      <div className={styles.pageSettings}>
        <Button onClick={() => goBack()}> back</Button>
        <h1 className={styles.roomID}>Room-ID: {roomId.current?.toString()}</h1>
        <Form className={styles.gameSettings}>
          <Row className={styles.firstFormItem}>
            <Col>
              <FormGroup>
                <FormLabel>Player amount (max. 4)</FormLabel>
                <Form.Control
                  className={styles.settingsInput}
                  disabled={hostName !== username ? true : false}
                  type="number"
                  value={maxPlayers}
                  onChange={(event) => {
                    let val = parseInt(event.target.value);
                    if (gameMode === "1vs1") {
                      setMaxPlayers(2);
                    } else if (gameMode === "Team") {
                      val += val % 2;
                      val = val > 2 ? 4 : 4; // später auf val setzen wenn true
                      setMaxPlayers(val);
                    } else {
                      val = val > 2 ? val : 3;
                      setMaxPlayers(val);
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Private</FormLabel>
                <Form.Check
                  className={styles.settingsCheck}
                  disabled={hostName !== username ? true : false}
                  type="switch"
                  checked={privateGame}
                  // label="Private"
                  onChange={(event) => {
                    setPrivate(event.target.checked);
                    dispatch(
                      setLobby({
                        roomId: roomId.current,
                        privateMatch: event.target.checked,
                      })
                    );
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={styles.formItem}>
            <Col>
              <FormGroup>
                <FormLabel>gameMode</FormLabel>
                <Form.Select
                  className={styles.settingsInput}
                  disabled={hostName !== username ? true : false}
                  value={gameMode}
                  onChange={(event) => {
                    let newMode = event.target.value;
                    setGameMode(newMode);
                    if (newMode === "1vs1") setMaxPlayers(2);
                    if (newMode === "FFA") setMaxPlayers(3);
                    if (newMode === "Team") setMaxPlayers(4);
                  }}
                >
                  <option>1vs1</option>
                  {/* <option>FFA</option> */}
                  <option>Team</option>
                  {/* <option>3</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <FormLabel>Map</FormLabel>
                <Form.Select
                  className={styles.settingsInput}
                  disabled={hostName !== username ? true : false}
                  onChange={(event) => setGameMap(event.target.value)}
                  value={gameMap}
                >
                  <option>Normal</option>
                  {/* <option>3</option> */}
                </Form.Select>
              </FormGroup>
            </Col>
          </Row>
          <Row className={styles.lastFormItem}>
            <FormGroup>
              <Col>
                <FormLabel>Shooting time (s)</FormLabel>

                <Form.Select
                  className={styles.settingsInput}
                  disabled={hostName !== username ? true : false}
                  value={shotTimer}
                  onChange={(event) =>
                    setShotTimer(parseInt(event.target.value))
                  }
                >
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </Form.Select>
              </Col>{" "}
              <Col>
                <FormLabel>with superWeapons?</FormLabel>
                <Form.Check
                  className={styles.settingsCheck}
                  disabled={hostName !== username ? true : false}
                  checked={superWeapons}
                  type="switch"
                  onChange={(event) => setSuperWeapons(event.target.checked)}
                />
              </Col>
            </FormGroup>
          </Row>
          <hr />
          <div className={styles.playerContainer}>
            <h4>Players:</h4>
            <br />
            {players?.map((player) => (
              <Card key={player} bg="light" className={styles.playerCard}>
                <Card.Title>{player}</Card.Title>
                {hostName === player ? null : (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      hostName !== player ? kickPlayer(player) : null
                    }
                  >
                    Kick{" "}
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </Form>
        <div className={styles.buttons}>
          <Button
            className={styles.settingsButton}
            onClick={() => handleSaveSettings()}
            disabled={hostName !== username ? true : false}
          >
            {!createdRoom ? "Host Game" : "Save settings"}
          </Button>
          <Button
            variant={players?.length === maxPlayers ? "success" : "light"}
            className={styles.settingsInput}
            size="lg"
            onClick={() => startGame()}
            disabled={
              players?.length === maxPlayers
                ? hostName === username
                  ? false
                  : true
                : true
            }
          >
            Start Game
          </Button>
        </div>
      </div>
    </>
  );
}
