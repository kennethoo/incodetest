import { useEffect, useState } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
function useIcon(userId) {
  const dispatch = useDispatch();
  const [icon, setIcon] = useState(null);

  const iconList = useSelector((state: RootStateOrAny) => state.iconList);
  useEffect(() => {
    const controller: any = new AbortController();
    const signal = controller.signal;
    const loadImage = async () => {
      const foundIcon = iconList[userId];
      if (foundIcon) {
        setIcon(foundIcon);
      } else {
        const { data } = await meettumApi.get(`/api/icon/${userId}`, signal);
        setIcon(data);
        const newOject = { ...iconList };
        newOject[userId] = data;
        dispatch({ type: "UPDATE_ICON", value: newOject });
      }
      return () => controller.abort();
    };
    if (userId) loadImage();
  }, [userId]);
  return {
    icon,
  };
}

export default useIcon;
