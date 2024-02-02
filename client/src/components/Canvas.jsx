import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import canvasState from '../store/canvasState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import '../styles/canvas.scss';
import toolState from "../store/toolState";

const Canvas = observer(() => {
  const { id } = useParams();

  const [modalShow, setModalShow] = useState(true);

  const canvasRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios.get(`http://localhost:5000/image?id=${id}`).then((res) => {
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }).catch((e) => {
      console.log(e);
    })
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000');
      canvasState.setSocket(socket);
      canvasState.setSessionId(id);
      toolState.setTool(new Brush(canvasRef.current, socket, id));
      socket.onopen = () => {
        console.log('Connected');
        socket.send(JSON.stringify({
          id,
          method: 'connection',
          username: canvasState.username,
        }));
      };

      socket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.log(msg);
        switch (msg.method) {
          case 'connection':
            console.log(`User ${msg.username} connected`);
            break;
          case 'draw':
            drawHandler(msg);
            break;
        }
      };
    }

  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext('2d');
    switch (figure.type) {
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case 'rect':
        Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
        break;
      case 'finish':
        ctx.beginPath();
    }
  }

  const handleMouseDown = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    axios.post(`http://localhost:5000/image?id=${id}`, {
      img: canvasRef.current.toDataURL()
    }).then((res) => {
      console.log(res.data)
    });
  };

  const handleConnect = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModalShow(false);
  };

  return (
    <div className="canvas">
      <Modal show={modalShow} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Type your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={usernameRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleConnect()}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas ref={canvasRef} width={600} height={400} onMouseDown={handleMouseDown} />
    </div>
  );
});

export default Canvas;