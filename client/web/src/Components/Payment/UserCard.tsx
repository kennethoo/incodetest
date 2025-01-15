const UserCard = ({ card, makeDefault, removeCard }) => {
  return (
    <div className="wrapwediiriri">
      <div className={`wraskfkfofnj-crsfdnf ${card.isDefault ? "active" : ""}`}>
        <div className="positf">
          <button></button>
        </div>
        <div className="wiijsjfjjfjfj">
          <div className="sjsjjfkfkfk speoer">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
              className="fsjjfjfjr"
            >
              <div className="boldsfk">{card.brand}</div>
              <div className="boldsfk">{card.isDefault && "Default"}</div>
            </div>
          </div>
          <div className="sjsjjfkfkfk">
            <div className="fsjjfjfjr">
              <div className="boldsfk">{card.ending}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="tabsjdjdj">
        {!card.isDefault && (
          <button onClick={() => makeDefault(card)}>Make Default</button>
        )}
        {!card.isDefault && (
          <button onClick={() => removeCard(card)}>Remove</button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
