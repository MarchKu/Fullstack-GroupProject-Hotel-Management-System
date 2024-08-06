"use client";

import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
  NotificationFeedContainer,
} from "@knocklabs/react";

import "@knocklabs/react/dist/index.css";

export default function NotificationMenu({ userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  console.log(isVisible);

  return userId ? (
    <>
      <KnockProvider
        apiKey="pk_test_8y5Kv2yWEnzo3oHKg29G3Q7NgwfRoB6Dmkye1G7JUxE"
        userId={userId}
      >
        <KnockFeedProvider feedId="5a838c50-e18f-40cb-aca8-a87479793059">
          <NotificationFeedContainer></NotificationFeedContainer>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(true)}
          />
        </KnockFeedProvider>
      </KnockProvider>
    </>
  ) : (
    <span>Loading...</span>
  );
}
