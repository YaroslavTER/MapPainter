
function Mod() {
  const mod = (a, b) => (a % b + b) % b;
  return mod;
}

export default Mod;
