function Toggle({ setToggle, value }) {
  return (
    <div className="switch-wrpaer">
      <label className="toggle-switch">
        <input
          onChange={(e) => {
            setToggle(e.target.checked);
          }}
          checked={value}
          type="checkbox"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default Toggle;
