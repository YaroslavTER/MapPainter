import canvas from '../Canvas/Canvas';

function Listeners() {
  const c = document.querySelector("canvas");

  const mouseState = {
    x: -1,
    y: -1
  };

  c.addEventListener(
    "mousemove",
    e => {
      updateMousePosition(e);
    },
    false
  );

  function updateMousePosition(e) {
    const rect = c.getBoundingClientRect();
    mouseState.x = e.clientX - rect.left;
    mouseState.y = e.clientY - rect.top;
  }

  return mouseState;
}

export default Listeners;
