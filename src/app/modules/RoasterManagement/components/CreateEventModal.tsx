
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { DynamicFormRenderer } from '@app/components';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import createCustomEvent from '@app/modules/RoasterManagement/schema/create-custom-event.json';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useCreateCustomEventMutation } from '@app/models';
import { useSnackbar } from 'notistack';
import { CHIPTYPE } from '@app/constants';

interface IOwnProps {
    openCreateModal: boolean;
    setOpenCreateModal: (openCreateModal: boolean) => void;
    formData: any;
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


const CreateEventModal: React.FC<IOwnProps> = ({ openCreateModal, setOpenCreateModal, formData, getCustomEventQuery }) => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [createCustomEventMutation] = useCreateCustomEventMutation({
        onCompleted: (data) => { 
            handleClose();
            getCustomEventQuery();
            enqueueSnackbar('Custom event created successfully', {
                variant: CHIPTYPE.SUCCESS,
            });
        },
        onError: (error) => {
            handleClose();
            enqueueSnackbar('Could not create custom event!', {
                variant: CHIPTYPE.ERROR,
            });
        }
    })

    const handleClose = (): void => {
        setOpenCreateModal(false);
    };

    const handleCreate = (values): void => {
        const customEventObj = {
            customEventType:values.customEventType,
            description: values.description,
            employee: {id: values.employee},
            endDate: moment(values.endDate).format('YYYY-MM-DD'),
            eventName: values.eventName,
            startDate: moment(values.startDate).format('YYYY-MM-DD')
        }
        createCustomEventMutation({ variables: { customEvent: customEventObj } })
    }

    const typeOptions = [{ label: 'PTO', value: 'PTO' }, { label: 'TRAINING', value: 'TRAINING' }];
    const loadTypes = () => (_props, _field, formOptions) => ({ ..._props, options: typeOptions });
    const actionMapper = {
        loadTypes,
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={openCreateModal}
                onSubmit={handleCreate}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create event
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DynamicFormRenderer
                            schema={createCustomEvent}
                            initialValues={formData}
                            onSubmit={handleCreate}
                            actionMapper={actionMapper}
                            onCancel={handleClose}
                        />
                    </LocalizationProvider>
                </DialogContent>
            </BootstrapDialog>
        </>
    )
}


export default CreateEventModal;