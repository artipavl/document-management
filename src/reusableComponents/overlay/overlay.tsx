"use client";
import React, { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.scss";

interface PortalProps {
  children: ReactNode;
  [key: string]: any;
}

const Overlay = ({ children, ...props }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className={styles.overlay}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child as React.ReactElement, props);
          })}
        </div>,
        ref.current
      )
    : null;
};

export default Overlay;
