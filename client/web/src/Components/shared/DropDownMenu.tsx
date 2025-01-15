import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import useColor from "hooks/useColor";
const Container = styled.div`
  position: relative;
`;
export default function DropDownMenu({
  options,
  style = {},
  custumIcon = null,
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const color = useColor();
  return (
    <Container style={{ ...style }}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          fontSize: "20px",
          color: color.text,
          width: "40px !important",
        }}
      >
        {custumIcon ? custumIcon : <IoEllipsisHorizontalSharp />}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        MenuListProps={{
          style: {
            backgroundColor: color.backgroundColor,
            color: color.text,
            padding: "0px",
            borderRadius: "10px",
          },
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent", // Set the background color to transparent or any other color
          },
        }}
      >
        {options.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => {
                if (item.handleClick) {
                  item.handleClick();
                }
                handleClose();
              }}
            >
              {item.item}
            </MenuItem>
          );
        })}
      </Menu>
    </Container>
  );
}
