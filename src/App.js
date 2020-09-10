import React from "react";
import { SendBirdProvider as SBProvider } from "sendbird-uikit";
import "sendbird-uikit/dist/index.css";

import CustomizedApp from "./CustomizedApp";
import { APP_ID, USER_ID, NICKNAME } from "./const";
import "./index.css";

export default function App() {
  return (
    <div className="app-wrapper">
      <SBProvider appId={APP_ID} userId={USER_ID} nickname={NICKNAME}>
        <CustomizedApp />
      </SBProvider>
    </div>
  );
}
