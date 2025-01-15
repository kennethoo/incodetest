import { useState } from "react";
import LoadingSpin from "Components/Loadingspin";
import useSubscription from "hooks/useSubscription";
import styled from "styled-components";
import { convertFromStripe } from "currencyFlow/formatMoneyTopayment";
import ActionButton from "Components/shared/ActionButton";
import SubscriptionToPro from "Components/pro/SubscriptionToPro";
import UserMannager from "ApiServiveGateWay/userMannager";
import useUser from "hooks/useUser";
import useLogger from "hooks/useLogger";
import moment from "moment-timezone";
import useTimeZone from "hooks/useTimeZone";
import { meetingDisplayFormatWithNoTime } from "utility/momentFormat";

const Container = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
const InfoContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;
const SubsctionContainerInfo = styled.div`
  width: 100%;
  max-width: 460px;
  border: 2px solid var(--main-bg-cool-rgb);
  border-radius: 20px;
`;

// Styled card container
const CardContainer = styled.div`
  display: flex;
  border: 2px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

// Styled title
const Text = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  color: var(--text);
`;
const TextWraper = styled.div`
  display: flex;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  color: var(--text);
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  padding: 5px;
`;
const NextPaymentDate = styled.p`
  margin-top: 20px;
  color: #dadada;
  text-align: center;
`;

function MannageSubscriptionComptainer() {
  const { subscription, isLoading }: { subscription: any; isLoading: boolean } =
    useSubscription();
  const timeZone = useTimeZone();

  const { user } = useUser();
  const logger = useLogger();
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const userMannager = new UserMannager(user.userId);
  const nextDatePayment = moment
    .utc(subscription.nextPaymentDate)
    .tz(timeZone)
    .format(meetingDisplayFormatWithNoTime);

  const cancelPlan = async () => {
    setIsButtonLoading(true);
    const { succeeded, errorMessage } = await userMannager.canCelSubScription(
      subscription?.planId,
    );
    if (succeeded) {
      window.location.reload();
    } else {
      logger({
        isErrorMessage: true,
        fileName: "MannageSubscription.tsx",
        message: errorMessage,
      });
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpin />;
    if (!subscription?.isSubScribe) {
      return (
        <SubsctionContainerInfo>
          <SubscriptionToPro />
        </SubsctionContainerInfo>
      );
    }
    const { price, name } = subscription;
    return (
      <InfoContainer>
        <Header style={{ marginBottom: "20px" }}>
          Hey {user.username}, no stress You are already a member ❤️
        </Header>
        <SubsctionContainerInfo style={{ border: subscription ? "0" : "" }}>
          <CardContainer
            style={{ border: "2px solid #6f56e5", marginBottom: "30px" }}
          >
            <div>
              <div>
                <TextWraper>
                  <Text style={{ fontSize: "25px" }}>
                    ${convertFromStripe(price)}
                  </Text>
                  <Text
                    style={{
                      fontSize: "15px",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    /
                  </Text>
                  <Text style={{ color: "#dadada", fontSize: "15px" }}>
                    {name}
                  </Text>
                </TextWraper>
              </div>
            </div>
          </CardContainer>
          <ActionButton
            isLoading={isButtonLoading}
            label="Cancel Plan"
            isCancelAction={true}
            handleClick={cancelPlan}
          />
          <NextPaymentDate>
            Your subscription will renew on {nextDatePayment}
          </NextPaymentDate>
        </SubsctionContainerInfo>
      </InfoContainer>
    );
  };

  return <Container>{renderContent()}</Container>;
}

export default MannageSubscriptionComptainer;
