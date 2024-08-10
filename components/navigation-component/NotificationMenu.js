"use client";

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";
import "dotenv/config";

export default function NotificationMenu({ userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const [isOnClose, setIsOnClose] = useState(false);

  return userId ? (
    <>
      <KnockProvider apiKey={process.env.NEXT_PUBLIC_KNOCK_PK} userId={userId}>
        <KnockFeedProvider feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID}>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={() => {
              isOnClose ? setIsOnClose(false) : setIsVisible(!isVisible);
            }}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => {
              setIsOnClose(true);
              setIsVisible(false);
            }}
          />
        </KnockFeedProvider>
      </KnockProvider>
    </>
  ) : (
    <span>Loading...</span>
  );
}
