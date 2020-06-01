import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonButton } from '@ionic/react';
import React, { useRef, useEffect, useState } from 'react';
import './Game1.css';
import Matter from 'matter-js';

const Game1: React.FC = () => {
  const gameEl = useRef(null);

  // const [height] = useState(window.innerHeight);
  // const [width] = useState(window.innerWidth);
  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight - 56;
    const x1 = 5;
    const x2 = width / 4;
    const x3 = width / 2;
    const x4 = x2 + x3;
    const x5 = width - 5;
    console.log('height', height, 'width', width);

    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Constraint = Matter.Constraint;

    const engine = Engine.create({
      // positionIterations: 20
    });
    const world = engine.world;

    const render = Render.create({
      element: gameEl.current!,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: './assets/bg2.png',
        // wireframeBackground: './assets/bg.png',
      },
    });

    const ballB = Bodies.circle(x2, 100, 20);
    const recC = Bodies.rectangle(x3, 100, 80, 20);
    const constraintBC = Constraint.create({
      bodyA: ballB,
      bodyB: recC,
    });
    World.add(world, [ballB, recC]);
    World.add(world, constraintBC);

    var bodyTest = Bodies.rectangle(100, 250, 110, 20);

    var constraintTest = Constraint.create({
      pointA: { x: 250, y: 200 },
      bodyB: bodyTest,
      stiffness: 0.001,
    });
    World.add(world, [bodyTest]);

    var bodyTest2 = Bodies.polygon(100, 100, 3, 30);

    var constraintTest2 = Constraint.create({
      pointA: { x: 250, y: 200 },
      bodyB: bodyTest2,
      length: 0,
    });
    World.add(world, [bodyTest2]);
    World.add(world, constraintTest2);

    var bodyTest3 = Bodies.polygon(320, 150, 3, 40);

    var constraintTest3 = Constraint.create({
      pointA: { x: 130, y: 120 },
      bodyB: bodyTest3,
    });
    World.add(world, [bodyTest3]);
    World.add(world, constraintTest3);

    World.add(world, constraintTest);
    var body = Bodies.polygon(50, 50, 3, 30);

    World.add(engine.world, [
      // Bodies.rectangle(width / 2, 5, width, 10, { isStatic: true }),
      Bodies.rectangle(5, height / 2, 10, height, {
        isStatic: true,
      }),
      Bodies.rectangle(width - 5, height / 2, 10, height / 2 + height / 5, {
        isStatic: true,
      }),
      Bodies.rectangle(width / 2, height, width, 20, {
        isStatic: true,
      }),
      // Bodies.circle(width / 2, 0, 30, { restitution: 0.5 }),
      Bodies.rectangle(width / 2, 0, 80, 80, {
        render: {
          sprite: {
            xScale: 0.15,
            yScale: 0.15,
            texture: './assets/icon/icon.png',
          },
        },
      }),
      Bodies.rectangle(width / 2, 0, 150, 45, {
        render: {
          sprite: {
            xScale: 0.3,
            yScale: 0.3,
            texture: './assets/kidbox_red.png',
          },
        },
      }),
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        // constraint: {

        // }
        // constraint: {
        //   bodyA
        //   stiffness: 0.2,
        //   render: {
        //     visible: false,
        //   },
        // },
      });

    World.add(engine.world, mouseConstraint);

    Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
      // World.add(engine.world, Bodies.polygon(event.source.mouse.position.x, event.source.mouse.position.y, 3, 40));
      const posX = event.source.mouse.position.x;
      const posY = event.source.mouse.position.y;
      if (posY > height / 2) {
        return;
      }
      const rand = Math.random();
      if (rand <= 0.25) {
        World.add(engine.world, Bodies.polygon(event.source.mouse.position.x, event.source.mouse.position.y, 3, 30));
      }
      if (rand > 0.25 && rand < 0.5) {
        World.add(
          engine.world,
          Bodies.circle(event.source.mouse.position.x, event.source.mouse.position.y, 30, { restitution: 0.7 })
        );
      }
      if (rand >= 0.5 && rand <= 0.75) {
        World.add(engine.world, Bodies.rectangle(event.source.mouse.position.x, event.source.mouse.position.y, 50, 50));
      }
      if (rand > 0.75) {
        World.add(engine.world, Bodies.polygon(event.source.mouse.position.x, event.source.mouse.position.y, 5, 40));
      }
    });

    Engine.run(engine);

    Render.run(render);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonImg src="./assets/kidbox_red.png" onClick={() => window.location.reload()}></IonImg>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div ref={gameEl}></div>
      </IonContent>
    </IonPage>
  );
};

export default Game1;
