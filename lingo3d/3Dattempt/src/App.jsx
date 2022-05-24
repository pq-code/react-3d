import { Cube, World, Model, OrbitCamera, useLoop, Skybox } from 'lingo3d-react'
import { useState, useRef } from 'react'

function App() {
  let [postion, setPostion] = useState({ x: 0, y: 0, z: 0 })
  let [walking, setwalking] = useState(false)
  let modelRef = useRef()

  let handleClick = (ev) => {
    console.log(ev);
    ev.point.y = 0;
    setPostion(ev.point)
    setwalking(true)

    let model = modelRef.current
    model.lookAt(ev.point)
  }

  let handleIntersect = () => {
    setwalking(false)
  }

  useLoop(() => {
    let model = modelRef.current
    model.moveForward(-1)

  }, walking)

  return (
    <World>
      <Skybox texture="02.jpeg" y={postion.y} />
      <Cube width={9999} depth={9999} y={-100} onClick={handleClick} texture="1.jpeg" textureRepeat={20} />
      <Model
        ref={modelRef}
        src='xbot.fbx'
        animations={{ idele: "idle.fbx", walk: "walk.fbx" }}
        animation={walking ? "walk" : "idele"}
        intersectIds={["orangeBox"]}
        onIntersect={handleIntersect}
      />
      <OrbitCamera active z={300} />
      <Cube id="orangeBox" scale={0.2} color="orange" x={postion.x} y={postion.y} z={postion.z} visible={false} />
    </World>
  )
}

export default App
