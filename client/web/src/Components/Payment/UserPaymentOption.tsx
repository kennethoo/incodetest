import UserMannager from "ApiServiveGateWay/userMannager";
import styled from "styled-components";
import UserCard from "Components/Payment/UserCard";

const Container = styled.div`
  width: 100%;
`;
const UserPaymentOption = ({ cards }) => {
  const userMannager = new UserMannager(null);

  const makeDefault = async (data) => {
    await userMannager.markPaymentInfoAsDefault(data);
    window.location.reload();
  };

  const removeCard = async (data) => {
    await userMannager.removePaymentMethde(data);
    window.location.reload();
  };
  return (
    <Container className="wrapwediiriri">
      {cards?.map((card) => {
        return (
          <UserCard
            key={card._id}
            removeCard={removeCard}
            card={card}
            makeDefault={makeDefault}
          />
        );
      })}
    </Container>
  );
};

export default UserPaymentOption;
