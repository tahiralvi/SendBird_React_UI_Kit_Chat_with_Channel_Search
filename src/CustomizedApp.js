import React, { useState } from "react";
import {
  withSendBird,
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings
} from "sendbird-uikit";

import CustomChannelListHeader from "./CustomChannelListHeader";

function CustomizedApp(props) {
  // props
  const {
    config: { userId }
  } = props;

  // useState
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const [query, setQuery] = useState({
    channelListQuery: {
      includeEmpty: true,
      channelNameContainsFilter: ""
    }
  });

  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <CustomChannelListHeader
            setChannelUrl={(url) => {
              setCurrentChannelUrl(url);
            }}
            onSetQuery={setQuery}
          />

          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              } else {
                setCurrentChannelUrl("");
              }
            }}
            queries={query}
          />
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default withSendBird(CustomizedApp);
