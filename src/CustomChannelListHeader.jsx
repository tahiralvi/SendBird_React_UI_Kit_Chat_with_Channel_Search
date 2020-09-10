import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withSendBird, sendBirdSelectors } from "sendbird-uikit";

function CustomChannelListHeader(props) {
  const {
    // from withSendBird
    createChannel,
    sdk,
    // from parent component as prop
    setChannelUrl,
    onSetQuery
  } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="custom-channel-list">
        Channels
        <div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create
          </Button>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Select users</DialogTitle>
          <DialogContent>
            <DialogContentText>
              "Search + Implement list of users + checkbox here"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                let params = new sdk.GroupChannelParams();
                params.isPublic = false;
                params.isEphemeral = false;
                params.isDistinct = true;
                // params.addUserIds([]); add your userIds as array
                params.name = "NAME";
                createChannel(params)
                  .then((c) => {
                    setChannelUrl(c.url);
                  })
                  .catch((c) => console.warn(c));
                handleClose();
              }}
              color="primary"
              autoFocus
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <input
          onChange={(e) => {
            // apply a throttle here to avoid calling setQuery on every instance see the links for more info
            // https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
            // https://github.com/bhaskarGyan/use-throttle
            onSetQuery({
              channelListQuery: {
                channelNameContainsFilter: e.target.value
              }
            });
          }}
          placeholder="search channel"
        />
      </div>
    </>
  );
}

export default withSendBird(CustomChannelListHeader, (state) => {
  return {
    createChannel: sendBirdSelectors.getCreateChannel(state),
    sdk: sendBirdSelectors.getSdk(state)
  };
});
