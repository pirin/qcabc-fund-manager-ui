import React, { ElementType, PropsWithChildren } from "react";
import clsx from "clsx";

// Base reusable card style (shared across Portfolio, Admin, etc.)
export const baseCardClass =
  "rounded-sm border border-base-300/60 bg-base-100/80 backdrop-blur-sm p-5 shadow-sm flex flex-col gap-2";

type CardProps<T extends ElementType = "div"> = PropsWithChildren<{
  className?: string;
  as?: T;
}>;

export const Card = <T extends ElementType = "div">({ children, className, as }: CardProps<T>) => {
  const Component = as || "div";
  return <Component className={clsx(baseCardClass, className)}>{children}</Component>;
};

export default Card;
