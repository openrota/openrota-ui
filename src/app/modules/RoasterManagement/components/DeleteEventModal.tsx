import { useDeletEventMutation } from '@app/models';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';
import { EventData } from '../constants';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';

interface IOwnProps {
    openDeleteModal: boolean;
    handleCloseDeleteModal: () => void;
    selectedEvent: EventData;
    getCustomEventQuery: any;
}

const DeleteEventModal: React.FC<IOwnProps> = ({ openDeleteModal, handleCloseDeleteModal, selectedEvent, getCustomEventQuery }) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [deleteCustomEventMutation] = useDeletEventMutation({
        onCompleted: (data) => {
            handleCloseDeleteModal();
            getCustomEventQuery();
            enqueueSnackbar('Custom event deleted successfully', {
                variant: CHIPTYPE.SUCCESS,
            });
        },
        onError: (error) => {
            handleCloseDeleteModal();
            enqueueSnackbar('Could not delete the custom event!', {
                variant: CHIPTYPE.ERROR,
            });
        }
    })

    const handleConfirmDeletion = () => {
        deleteCustomEventMutation({ variables: { id: selectedEvent?.eventId } });
    }

    return (
        <Dialog
            open={openDeleteModal}
            onClose={handleCloseDeleteModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete event"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you really sure to delete this event - '${selectedEvent.title}'
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteModal}>Disagree</Button>
                <Button onClick={handleConfirmDeletion} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteEventModal;