import React from 'react';
import moment from "moment";
import Timeline, { TimelineHeaders, DateHeader, SidebarHeader } from "react-calendar-timeline";
import 'react-calendar-timeline/lib/Timeline.css';
import Popover from '@mui/material/Popover';
import { ResourceData, EventData, CalendarType } from '../constants';
import CalendarToolbar from './CalendarToolbar';
import CreateEventModal from './CreateEventModal';
import { Button, Dialog, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Stack, styled, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteEventModal from './DeleteEventModal';
import EditEventModal from './EditEventModal';

interface IOwnProps {
    calendarEvents: EventData[];
    resources: ResourceData[];
    getCustomEventQuery?: any;
    calendarType: CalendarType;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const TimelineComponent: React.FC<IOwnProps> = ({ calendarEvents, resources, calendarType, getCustomEventQuery}) => {

    const [visibleTimeStart, setVisibleTimeStart] = React.useState<number>(
        moment()
            .startOf('week')
            .toDate().valueOf()
    );
    const [visibleTimeEnd, setVisibleTimeEnd] = React.useState<number>(
        moment()
            .endOf('week')
            .toDate().valueOf()
    );

    const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [selectedEvent, setSelectedEvent] = React.useState<EventData>();
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState({});

    //Popover
    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const handleClose = (): void => {
        setAnchorEl(null);
    };
    //Popover - ends

    //Delete Modal - starts
    const handleOpenDeleteModal = (): void => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = (): void => {
        setOpenDeleteModal(false);
    };
    //Delete Modal - ends

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd): void => {
        setVisibleTimeStart(visibleTimeStart)
        setVisibleTimeEnd(visibleTimeEnd);
    };

    const handleCanvas = (itemId, e, time): void => {
        const resourceClicked: any = resources.find((resource) => resource.id === itemId);
        const defaultFormData = {
            eventName: '',
            description: '',
            startDate: '',
            endDate: '',
            customEventType: '',
            employee: resourceClicked?.resourceId
        }
        setFormData(defaultFormData);
        setOpenCreateModal(!openCreateModal);
    }

    const handleEditEvent = (): void => {
        const defaultFormData = {
            eventName: selectedEvent?.title.split(' - ')[0],
            description: selectedEvent?.description,
            startDate: moment(selectedEvent?.start_time, "x").format("YYYY-MM-DD"),
            endDate: moment(selectedEvent?.end_time, "x").format("YYYY-MM-DD"),
            customEventType: selectedEvent?.title.split(' - ')[1],
            employee: selectedEvent?.resourceId
        }
        setFormData(defaultFormData);
        handleClose();
        setOpenEditModal(!openCreateModal)
    }

    const handleDeleteEvent = (): void => {
        handleClose();
        handleOpenDeleteModal();
    }
    
    const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }): JSX.Element => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
        const backgroundColor = itemContext.selected ? (itemContext.dragging ? "rgb(122, 184, 235)" : "rgb(122, 184, 235)") : item.bgColor;
        const borderColor = itemContext.resizing ? "rgb(122, 184, 235)" : item.color;
        return (
            <>
                <Button
                    {...getItemProps({
                        style: {
                            backgroundColor,
                            color: item.color,
                            borderColor,
                            borderStyle: "solid",
                            borderWidth: 1,
                            borderRadius: 4,
                            borderLeftWidth: itemContext.selected ? 3 : 1,
                            borderRightWidth: itemContext.selected ? 3 : 1
                        },
                        onMouseDown: (e) => {
                            setAnchorEl(e.target);
                            setSelectedEvent(item);
                        }
                    })}
                >
                    {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
                    <div
                        style={{
                            height: itemContext.dimensions.height,
                            overflow: "hidden",
                            paddingLeft: 3,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {itemContext.title}
                    </div>
                    {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
                </Button>
            </>
        );
    }
    
    return (
        <>
            {calendarEvents.length > 0 && (
                <div style={{ width: '1800px', marginTop: '60px' }}>
                    <CalendarToolbar
                        visibleTimeStart={visibleTimeStart}
                        visibleTimeEnd={visibleTimeEnd}
                        setVisibleTimeStart={setVisibleTimeStart}
                        setVisibleTimeEnd={setVisibleTimeEnd}
                    />
                    <div style={{ marginTop: '30px' }}>
                        <Timeline
                            groups={resources}
                            items={calendarEvents}
                            fullUpdate
                            stackItems
                            lineHeight={50}
                            itemHeightRatio={0.75}
                            showCursorLine
                            canMove={false}
                            onCanvasDoubleClick={handleCanvas}
                            defaultTimeStart={visibleTimeStart}
                            defaultTimeEnd={visibleTimeEnd}
                            visibleTimeStart={visibleTimeStart}
                            visibleTimeEnd={visibleTimeEnd}
                            onTimeChange={handleTimeChange}
                            itemRenderer={itemRenderer}
                        >
                            <TimelineHeaders className="sticky" style={{ backgroundColor: "#1976d2" }}>
                                <SidebarHeader>
                                    {({ getRootProps }) => {
                                        return <div {...getRootProps()}>
                                            <p style={{ color: 'white', paddingTop: '15px', textAlign: 'center' }}>Shared resources</p>
                                        </div>;
                                    }}
                                </SidebarHeader>
                                <DateHeader unit="primaryHeader" />
                                <DateHeader />
                            </TimelineHeaders>
                        </Timeline>
                        {calendarType === CalendarType.ManagerView && openCreateModal && formData &&(<CreateEventModal openCreateModal={openCreateModal} setOpenCreateModal={setOpenCreateModal} formData={formData} getCustomEventQuery={getCustomEventQuery} />)}
                        {openEditModal && formData &&(<EditEventModal openEditModal={openEditModal} setOpenEditModal={setOpenEditModal} formData={formData} selectedEvent={selectedEvent} getCustomEventQuery={getCustomEventQuery} />)}
                        {selectedEvent && <DeleteEventModal openDeleteModal={openDeleteModal} handleCloseDeleteModal={handleCloseDeleteModal} selectedEvent={selectedEvent} getCustomEventQuery={getCustomEventQuery} />}
                    </div>
                </div>)}
            {selectedEvent && (<Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>{selectedEvent?.title}</Typography>
                <Divider />
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Description"
                            secondary={
                                <React.Fragment>
                                    {selectedEvent?.description}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Duration"
                            secondary={
                                <React.Fragment>
                                    {moment(selectedEvent?.start_time, "x").format("DD-MM-YYYY") + ' <--> ' + moment(selectedEvent?.end_time, "x").format('DD-MM-YYYY')}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary="Employee"
                            secondary={
                                <React.Fragment>
                                    {selectedEvent?.group}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {calendarType === CalendarType.ManagerView && selectedEvent?.type === 'customEvent' && (<Stack direction="row-reverse"  >
                        <IconButton color="error" aria-label="delete" onClick={handleDeleteEvent}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="edit" onClick={handleEditEvent}>
                            <EditIcon />
                        </IconButton>
                    </Stack>)}
                </List>
            </Popover>)}

        </>
    )
}
export default TimelineComponent;
