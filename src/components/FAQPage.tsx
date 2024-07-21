import React from 'react';

import Anmeldung from '../assets/pictures/FAQ/Anmeldung.png';
import Spieleinstellungen from '../assets/pictures/FAQ/Spieleinstellungen.jpg';
import Profileinstellungen from '../assets/pictures/FAQ/Profileinstellungen.png';
import Profileinstellungen_Ü from '../assets/pictures/FAQ/Profileinstellungen_Übersicht.png';
import Skinauswahl from '../assets/pictures/FAQ/Skinauswahl.png';
import SpielmodusAuswahl from '../assets/pictures/FAQ/Offline-Online_Auswahl.png';
import Lobby from '../assets/pictures/FAQ/LobbyEinstelllungen.png';
import SpielBeitreten from '../assets/pictures/FAQ/SpielBeitreten.png';
import OfflinePlatzierung from '../assets/pictures/FAQ/OfflinePlatzierung.png';
import Schiessen from '../assets/pictures/FAQ/Schiessen.png';
import Spezialwaffen from '../assets/pictures/FAQ/Spezialwaffen.png';

const gameExplanationItems = [
  {
    title: "Registrierung und Anmeldung",
    images: [Anmeldung],
    content: "Registrieren Sie sich über den 'Sign Up'-Button und geben Sie Ihre Daten ein. Melden Sie sich an, indem Sie Ihre E-Mail und Ihr Passwort eingeben und auf 'Sign In' klicken. Alternativ können Sie als Gast fortfahren, indem Sie auf 'Als Gast fortfahren' klicken."
  },
  {
    title: "Spieleinstellungen",
    images: [Spieleinstellungen],
    content: "Klicken Sie oben rechts, um Sound und Musik ein- oder auszuschalten. Hier finden Sie auch die Optionen zum Ausloggen und den Zugang zu den Profileinstellungen."
  },
  {
    title: "Profileinstellungen - Übersicht",
    images: [Profileinstellungen],
    content: "Klicken Sie auf das Profilbild (oben rechts) für eine Übersicht Ihrer Punkte und Level."
  },
  {
    title: "Profileinstellungen - Detailansicht",
    images: [Profileinstellungen_Ü],
    content: "Nachdem Sie auf das Profilbild geklickt haben können Sie, über 'Settings' Ihre E-Mail-Adresse aktualisieren oder das Passwort ändern."
  },
  {
    title: "Profileinstellungen - Skinauswahl",
    images: [Skinauswahl],
    content: "In den Profileinstellungen können Sie auch Ihren Skin ändern, indem Sie über das Drop-Down-Menü einen Skin auswählen."
  },
  {
    title: "Spielmodi auswählen",
    images: [SpielmodusAuswahl],
    content: "Wählen Sie auf der Startseite zwischen Offline-Modus und Online-Modus. Offline-Modus: Sie spielen gegen die KI. Online-Modus: Sie spielen gegen andere Spieler bzw ihre Freunde."
  },
  {
    title: "Online-Spiel erstellen",
    images: [Lobby],
    content: "Nachdem Sie 'Online Modus' und 'Host Game' gewählt haben, legen Sie Spielparameter wie Spezialwaffen und Spielmodus fest. Klicken Sie auf 'Host Game', um die Lobby zu erstellen. Um Änderungen zu speichern, klicken Sie auf 'Save Settings'. Mit 'Start Game' beginnen Sie das Spiel."
  },
  {
    title: "Einem Spiel beitreten",
    images: [SpielBeitreten],
    content: "Wählen Sie 'Online Modus' und dann 'Join Game'. Aktualisieren Sie die Lobbyliste oder treten Sie direkt bei, wenn das gewünschte Spiel sichtbar ist. Ansonsten haben Sie auch die Möglichkeit, über die Eingabe der RoomID der Lobby beizutreten."
  },
  {
    title: "Schiffs- und Minenplatzierung",
    images: [OfflinePlatzierung],
    content: `Platzieren Sie Ihre Schiffe und Minen strategisch auf dem Spielfeld per Drag and Drop. Drehen Sie Schiffe über das Rotations-Symbol. Ebenso haben Sie hier die Möglichkeit, bei einem Offline-Spiel die KI-Stärke auszuwählen. Klicken Sie auf 'Start', wenn Sie bereit sind. 
HINWEIS: Beim Schiffeplatzieren im Teammodus kann es passieren, dass die Schiffe des Teampartners nicht richtig dargestellt werden.`
  },
  {
    title: "Schießen",
    images: [Schiessen],
    content: "Schießen Sie, indem Sie auf ein Feld im gegnerischen Bereich klicken. Bei einem Treffer sind Sie erneut am Zug (Feld wird orange, beim Verfehlen wird das Feld grau)."
  },
  {
    title: "Spezialwaffen",
    images: [Spezialwaffen],
    content: "Setzen Sie Spezialwaffen ein, indem Sie auf den Torpedo- oder Hubschrauber-Button klicken und dann das Zielfeld oder die Zielreihe auswählen."
  }
];

const GameExplanationPage: React.FC = () => {
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f0f8ff' }}>
      <h1 className="text-center mb-5">Wie man Ocean Combat spielt</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {gameExplanationItems.map((item, index) => (
          <div className="col" key={index}>
            <div className="card border-0 shadow h-100">
              <div className="card-img-container" style={{ height: '400px', overflow: 'hidden' }}>
                <img 
                  src={item.images[0]} 
                  className="card-img-top" 
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }} 
                />
              </div>
              <div className="card-body d-flex flex-column p-4">
                <h3 className="card-title mb-3">{item.title}</h3>
                <p className="card-text flex-grow-1 fs-5">
                  {item.content.split('\n')[0]}
                </p>
                <p className="card-text flex-grow-1 fs-5" style={{ color: 'black', fontWeight: 'normal' }}>
                  {item.content.split('\n')[1]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameExplanationPage;