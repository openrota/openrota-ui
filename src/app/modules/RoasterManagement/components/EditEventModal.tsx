import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DynamicFormRenderer } from '@app/components';
import createCustomEvent from '@app/modules/RoasterManagement/schema/create-custom-event.json';
import { EventData } from '../constants';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';
import { useCreateCustomEventMutation, useDeletEventMutation } from '@app/models';
import moment from 'moment';

interface IOwnProps {
    openEditModal: boolean;
    setOpenEditModal: (openEditModal: boolean) => void;
    formData: any;
    selectedEvent: EventData;
    getCustomEventQuery: any;
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

const EditEventModal: React.FC<IOwnProps> = ({ openEditModal, setOpenEditModal, formData, selectedEvent, getCustomEventQuery }) => {

    const [updateFormData, setUpdatedFormData] = React.useState<any>({});

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [createCustomEventMutation] = useCreateCustomEventMutation({
        onCompleted: (data) => { 
            handleClose();
            getCustomEventQuery();
            enqueueSnackbar('Custom event edit successfully', {
                variant: CHIPTYPE.SUCCESS,
              });
            
        },
        onError: (error) => {
            handleClose();
            enqueueSnackbar('Could not edit custom event!', {
                variant: CHIPTYPE.ERROR,
              });
        }
    });

    const handleClose = (): void => {
        setOpenEditModal(false);
    };

    const typeOptions = [{ label: 'PTO', value: 'PTO' }, { label: 'TRAINING', value: 'TRAINING' }];
    const loadTypes = () => (_props, _field, formOptions) => ({ ..._props, options: typeOptions });
    const actionMapper = {
        loadTypes,
    };

    const handleEdit = (values) => {
        setUpdatedFormData(values);
        const customEventObj = {
            id: selectedEvent.eventId,
            customEventType:values.customEventType,
            description: values.description,
            employee: {id: values.employee},
            endDate: values.endDate,
            eventName: values.eventName,
            startDate: values.startDate
        }
        createCustomEventMutation({ variables: { customEvent: customEventObj } })
    }

    return(
        <>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openEditModal}
            onSubmit={handleEdit}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Edit event
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DynamicFormRenderer
                        schema={createCustomEvent}
                        initialValues={formData}
                        onSubmit={handleEdit}
                        actionMapper={actionMapper}
                        onCancel={handleClose}
                    />
                </LocalizationProvider>
            </DialogContent>
        </BootstrapDialog>
    </>
    )
}

export default EditEventModal;