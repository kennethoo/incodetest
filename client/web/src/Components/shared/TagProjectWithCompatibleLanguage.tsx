import { useState, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { apiGateway } from "ApiServiveGateWay/apiGateway";
import meettumApi from "ApiServiveGateWay/apiConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";
import profile from "profile.webp";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import useDebounce from "hooks/useDebounce";

const AddUser = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #6f56e5;
`;
const ListOfUser = styled.div`
  max-height: 300px;
  overflow: auto;
`;
const Title = styled.div`
  width: calc(100% - 70px);
  color: var(--text);
  display: flex;
  align-items: center;

  text-transform: capitalize;
`;
const RemoveParticipant = styled.button`
  min-width: 25px;
  height: 25px;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
  border: 0;

  margin-left: 5px;
`;

const Container = styled.div`
  border: 1px solid var(--main-bg-cool-rgb);
  border-radius: 10px;
  padding: 5px;
`;
const OptionItem = styled.div`
  border-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
`;
const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
`;

const TagItem = styled.div`
  display: flex;
  padding: 5px;
  color: var(--text);
  border-radius: 5px;
  text-transform: capitalize;
`;

const techList = [
  apiGateway.JAVASCRIPT,
  apiGateway.HTML,
  apiGateway.JAVA,
  apiGateway.GO,
  apiGateway.PYTHON,
];

function TagProjectWithCompatibleLanguage({ setTag, tags }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedSearchInput = useDebounce(query, 200);
  const [people, setPeople] = useState([]);

  const isInTheList = (userId) => tags.some((user) => user.userId === userId);

  const addPerson = (tag) => {
    setTag((prevTag) => [...prevTag, tag]);
  };

  const removeParticipant = (tagToRemove) => {
    setTag((prevTag) => prevTag.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <SelectedTagsContainer>
        {tags?.map((tag) => (
          <TagItem key={tag}>
            {tag}
            <RemoveParticipant onClick={() => removeParticipant(tag)}>
              <IoCloseSharp />
            </RemoveParticipant>
          </TagItem>
        ))}
      </SelectedTagsContainer>

      <ListOfUser>
        {techList.map((language, index) => (
          <OptionItem key={language || index}>
            <Title>{language}</Title>
            <AddUser onClick={() => addPerson(language)}>
              <GoPlus />
            </AddUser>
          </OptionItem>
        ))}
      </ListOfUser>
    </Container>
  );
}

export default TagProjectWithCompatibleLanguage;
