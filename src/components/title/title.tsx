import React, { FC } from "react";

import style from "./title.module.scss";

type TitleProps = {
  title: string;
};

const Title: FC<TitleProps> = ({ title }) => {
  return <h1 className={style.title}>{title}</h1>;
};

export default Title;
