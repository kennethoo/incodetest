import { useEffect } from "react";
import useUser from "hooks/useUser";
import { useNavigate } from "react-router-dom";
function useMeettumProRedirect() {
  const { user } = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isProUser) {
      // history.replace('/meetttum/join/pro');
    }
  }, [user]);
  return;
}

export default useMeettumProRedirect;
