import React from "react";
import { NoticeDto } from "../../../utils/types/notice.type";

export const ContentNotice = ({
  _id,
  userName,
  userId,
  date,
  description,
}: NoticeDto) => {
  return (
    <div>
      <p>{userName}</p>
      <p>{description}</p>
      <p>{date}</p>
    </div>
  );
};
