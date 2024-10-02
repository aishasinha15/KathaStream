import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import VideoBackground from "./VideoBackground";
import { setOpen } from "../redux/movieSlice";
import { styled } from "@mui/material/styles";
import VideoTitle from "./VideoTitle";

// Custom styled Dialog component
const SquareDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "80vw",
    height: "70vw",
    maxWidth: "800px",
    maxHeight: "700px",
    margin: "20px",
  },
}));

// Custom styled DialogContent
const SquareDialogContent = styled(DialogContent)({
  padding: 0,
  height: "100%",
  "& .MuiDialogContentText-root": {
    height: "100%",
  },
});

export default function MovieDialog() {
  const { open, id } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <React.Fragment>
      <SquareDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <SquareDialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ height: "100%" }}
          >
            <VideoBackground movieId={id} />
          </DialogContentText>
        </SquareDialogContent>
        <DialogActions>
          <Button
            className="w-full py-2 bg-gradient-to-r from-[#03ecfc] to-[#0086c0] text-black font-quicksand font-medium rounded-md hover:from-[#03ecfc] hover:to-[#0086c0]"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </SquareDialog>
    </React.Fragment>
  );
}
