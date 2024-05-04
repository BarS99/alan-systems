const SpinnerWave: React.FC = () => {
  return (
    <div className="spinner-wave [--spinner-color:var(--blue-6)]">
      <p className="sr-only">Loading...</p>
      <div className="spinner-wave-dot"></div>
      <div className="spinner-wave-dot"></div>
      <div className="spinner-wave-dot"></div>
      <div className="spinner-wave-dot"></div>
    </div>
  );
};

export default SpinnerWave;
