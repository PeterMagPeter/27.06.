export type UserResource = {
  id?: string;
  email: string;
  password?: string;
  username: string;
  points?: number;
  // picture?: string
  premium?: boolean;
  level?: number;
  gameSound?: boolean;
  music?: boolean;
  higherLvlChallenge?: boolean;
};

export type Guest = {
  id?: string;
  username: string;
  points: number;
  // picture: string
};

export type LoginResource = {
  id: string;
  /** Expiration time in seconds since 1.1.1970 */
  exp: number;
};
export const TeamNames: string[] = ["Wasser-Wrestler", "See-Soldaten"];

export const skinImgs = new Map<string, string>([
  ["standard", "../assets/pictures/Skins/Standard/"],
  ["green", "../assets/pictures/Skins/Grün/"],
  ["pink", "../assets/pictures/Skins/Pink/"],
  ["turquoise", "../assets/pictures/Skins/Türkies/"],
  ["camouflage", "../assets/pictures/Skins/CamouflageBlau/"],
  ["cow", "../assets/pictures/Skins/KuhFlecken/"],
  ["duck", "../assets/pictures/Skins/Ente/"],
  ["dog", "../assets/pictures/Skins/Hund/"],
  ["sausage", "../assets/pictures/Skins/Wurst/"],
]);

export function getSkinImage(skin: string, number: string = "3") {
  const images: { [key: string]: string } = {
    standard: require("./assets/pictures/Skins/Standard/" + number + ".png"),
    green: require("./assets/pictures/Skins/Grün/" + number + ".png"),
    pink: require("./assets/pictures/Skins/Pink/" + number + ".png"),
    turquoise: require("./assets/pictures/Skins/Türkies/" + number + ".png"),
    camouflage: require("./assets/pictures/Skins/Camouflage/" + number + ".png"),
    cow: require("./assets/pictures/Skins/KuhFlecken/" + number + ".png"),
    duck: require("./assets/pictures/Skins/Ente/" + number + ".png"),
    dog: require("./assets/pictures/Skins/Hund/" + number + ".png"),
    sausage: require("./assets/pictures/Skins/Wurst/" + number + ".png"),
  };
  return images[skin];
}

export type Position = {
  x: number;
  y: number;
};

export function generateRoomId(): string {
  const currentTime = Date.now();
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const roomId2 = currentTime + randomNumber;
  return JSON.stringify(roomId2);
}
