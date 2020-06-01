import React, { useRef } from 'react';

import Phaser from 'phaser';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

class MainScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/icon/icon.png');
  }
  create() {
    this.physics.add.image(10, 10, 'sky');
    // this.matter.add.image(20, 20, 'sky');
    // this.matter.add.rectangle(0, 0, 50, 50, { isStatic: true });
  }
}

const Game2: React.FC = () => {
  const gameRef = useRef(null);

  const create = () => {};
  const config = {
    type: Phaser.AUTO,
    parent: gameRef.current!,

    width: '100%',
    height: '100%',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
      },
    },
    // scene: {
    //   preload: preload,
    //   create,
    // },
    scene: MainScene,
  };

  const game = new Phaser.Game(config);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer /> */}
        {/* <IonPhaser game={game} initialize={true} /> */}
        <div ref={gameRef}></div>
      </IonContent>
    </IonPage>
  );
};

export default Game2;
