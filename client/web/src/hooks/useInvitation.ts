import { useState, useEffect } from "react";
import { meetingSessionMannagerApi } from "ApiServiveGateWay/meetingSessionMannager";
import { contactApi } from "ApiServiveGateWay/contactApi";
import useUser from "hooks/useUser";

import { useDispatch, useSelector } from "react-redux";

function useInvitation() {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [invitations, setData] = useState([]);
  const dispatch = useDispatch();

  const listOfInvitation = useSelector((state: any) => state.listOfInvitation);

  useEffect(() => {
    setData(listOfInvitation);
  }, [listOfInvitation]);

  const removeInvitation = (invitationId) => {
    const newMeetingSessionList = listOfInvitation.filter(
      ({ _id }) => _id !== invitationId,
    );
    dispatch({
      type: "UPDATE_INVITATION_LIST",
      value: newMeetingSessionList,
    });
  };

  const fetchMeetingInvigation = async () => {
    const query = {
      meetingSessionState: meetingSessionMannagerApi.CONFIRM,
      participants: {
        $elemMatch: {
          userId: user?.email,
          status: meetingSessionMannagerApi.UNCONFIRM,
        },
      },
    };
    const list: any = await meetingSessionMannagerApi.getMeetingSessions(query);

    return list.data;
  };

  const fetchAddToContactInvitation = async () => {
    const query = {
      userIds: { $in: [user.userId] },
      status: contactApi.PENDING,
    };
    const { data: resultData } = await contactApi.getUserContactInfo(query);
    const { contact } = resultData;
    const filterData = contact.filter((item) => {
      return item.requesterId !== user.userId;
    });
    return filterData;
  };

  const fetchData = async () => {
    const meetingInviTaiton = await fetchMeetingInvigation();
    const contactInvitaiton = await fetchAddToContactInvitation();
    dispatch({
      type: "UPDATE_INVITATION_LIST",
      value: [...meetingInviTaiton, ...contactInvitaiton, ...invitations],
    });
  };

  const startFetching = async () => {
    await fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };
  useEffect(() => {
    startFetching();
  }, []);

  return { invitations, isLoading, removeInvitation };
}
export default useInvitation;
