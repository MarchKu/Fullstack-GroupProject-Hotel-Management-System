"use client";

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";

export default function NotificationMenu({ userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return userId ? (
    <KnockProvider
      apiKey="pk_test_8y5Kv2yWEnzo3oHKg29G3Q7NgwfRoB6Dmkye1G7JUxE"
      userId={userId}
    >
      <KnockFeedProvider feedId="5a838c50-e18f-40cb-aca8-a87479793059">
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(event) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={(event) => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  ) : (
    <span>Loading...</span>
  );
}
