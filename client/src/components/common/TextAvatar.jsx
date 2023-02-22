import { Avatar } from "@mui/material";
import React from "react";

const TextAvatar = ({ text }) => {
  const stringColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };
  return (
    <Avatar
      sx={{ backgroundColor: stringColor(text), width: 40, height: 40 }}
      children={`${text.split(" ")[0][0]}`}
    />
  );
};

export default TextAvatar;
