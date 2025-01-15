import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MannageSubscriptionComptainer from "Components/pro/MannageSubscriptionComptainer";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

function MannageSubscription() {
  const navigate = useNavigate();
  const goBack = (e) => {
    navigate(-1);
  };

  return (
    <div className="box-profile-eidt">
      <div className="box-generelfunction-edit">
        <div className="tabs-edit-naviagation">
          <div className="title-edit">
            <div className="before-edit">
              <div onClick={goBack} className="close-that">
                <BiArrowBack />
              </div>
              <p>Manage Subscription</p>
            </div>
          </div>
          <Container>
            <MannageSubscriptionComptainer />
          </Container>
        </div>
      </div>
    </div>
  );
}

export default MannageSubscription;
