import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiArrowBack } from "react-icons/bi";

import LoadingSpin from "Components/Loadingspin";

import usePaymentMethode from "hooks/usePaymentMethode";
import styled from "styled-components";

import UserPaymentOption from "Components/Payment/UserPaymentOption";
const NoPaymentMethideAdded = styled.div`
  margin-top: 40px;
`;

const ContainerOptions = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const PaymentInfo = () => {
  const {
    paymentMethode,
    isLoading,
  }: { paymentMethode: any; isLoading: boolean } = usePaymentMethode();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="bdoorr">
          <LoadingSpin />
        </div>
      );
    }

    if (!paymentMethode || paymentMethode?.paymentMethods?.length === 0) {
      return (
        <NoPaymentMethideAdded className="wraperjf-ffkfkr">
          <p>No Payment Method Added</p>
          <p>Payment Methods are added after a subscription</p>
        </NoPaymentMethideAdded>
      );
    }

    return (
      <ContainerOptions>
        <UserPaymentOption cards={paymentMethode?.paymentMethods} />;
      </ContainerOptions>
    );
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
              <p>Payment Method</p>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
