import { useState, useEffect } from "react";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { InView } from "react-intersection-observer";
import LoadingSpin from "./Loadingspin";
import { motion } from "framer-motion";
import useDebounce from "hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import profile from "profile.webp";

const SearchUserAccount = ({ tabs }: { tabs?: any }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedSearchInput = useDebounce(query, 200);
  const [loadPeople, setLoadPeople] = useState(5);

  const loadMore = (isInView) => {
    if (isInView) {
      setLoadPeople(loadPeople + 5);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      if (loading) return;
      setLoading(true);
      const { data } = await meettumApi.get(
        `/api/profilename/${debouncedSearchInput.toLowerCase()}/${loadPeople}`,
        { withCredentials: true, signal },
      );
      setPeople(data);
      setLoading(false);
      return () => controller.abort();
    };
    if (debouncedSearchInput.length) {
      fetchData();
    } else {
      setPeople([]);
      setLoading(false);
    }
  }, [debouncedSearchInput, loadPeople]);

  return (
    <>
      <div className="seach-user-wraper">
        <div className={`box-find ${tabs ? "active" : ""}`}>
          <input
            onChange={(e) =>
              setQuery(e.target.value.trim().replace(/[^a-zA-Z ]/g, ""))
            }
            className="seach-prp"
            type="text"
            name="profile"
            placeholder="Search people..."
            style={{ padding: "10px" }}
          />
          {loading ? (
            <div className="bixnknfkfjkjrjr">
              <LoadingSpin />
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          className={`box-profile-session ${people.length ? "active" : ""} `}
        >
          {people.map((item, index) => {
            const profileUrl = item.profile ? item.profile : profile;

            if (people.length === index + 1) {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="profile-tofind"
                  key={item._id}
                  onClick={() => {
                    navigate(`/${item.username}`);
                  }}
                >
                  <InView
                    onChange={(inView) => loadMore(inView)}
                    className="profile-tofindt"
                  >
                    <div className="icon-image">
                      <LazyLoadImage
                        alt={item.username}
                        effect="blur"
                        height="100%"
                        src={profileUrl}
                        width="100%"
                      />
                    </div>
                    <div className="inf-or">{item.username}</div>
                  </InView>
                </motion.div>
              );
            } else {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="profile-tofind"
                  key={item._id}
                  onClick={() => {
                    navigate(`/${item.username}`);
                  }}
                >
                  <div className="icon-image">
                    <LazyLoadImage
                      alt={item.username}
                      effect="blur"
                      height="100%"
                      src={profileUrl}
                      width="100%"
                    />
                  </div>
                  <div className="inf-or">{item.username}</div>
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default SearchUserAccount;
