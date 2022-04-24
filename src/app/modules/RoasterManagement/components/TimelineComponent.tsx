import React from 'react';
import moment from "moment";
import axios from 'axios';
import Timeline, { TimelineHeaders, DateHeader, SidebarHeader } from "react-calendar-timeline";
import 'react-calendar-timeline/lib/Timeline.css';
import Popover from '@mui/material/Popover';
import { TimelineKeys, ResourceData } from '../constants';
import CalendarToolbar from './CalendarToolbar';

interface IOwnProps {
    calendarEvents: any;
    resources: any;
    setResources: (resources: ResourceData[]) => void;
}

const TimelineComponent: React.FC<IOwnProps> = ({ calendarEvents, resources, setResources }) => {

    const [visibleTimeStart, setVisibleTimeStart] = React.useState<any>(
        moment()
            .startOf('week')
            .toDate().valueOf()
    );
    const [visibleTimeEnd, setVisibleTimeEnd] = React.useState<any>(
        moment()
            .endOf('week')
            .toDate().valueOf()
    );
    const [alerts, setAlerts] = React.useState<any>([])

    const [resourceID, setResourceId] = React.useState<string>('');
    const [currentItem, setCurrentItem] = React.useState({});
    const [currentGroup, setCurrentGroup] = React.useState<string>('');

    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    //Popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addAlert = (title, variant, key): void => {
        setAlerts([...alerts, { title: title, variant: variant, key }]);
    };
    const removeAlert = (key): void => {
        const tempAlerts = alerts.filter(el => el.key !== key)
        setAlerts([...tempAlerts]);
    };

    const handleUpdate = async (payload): Promise<void> => {
        try {
            await axios.put('http://localhost:4000/rotaCalendars/events/update', payload).then((res) => {
                addAlert('Reschedule sucess', 'success', Math.random())
            });
        } catch (error) {
            addAlert('Reschedule failed', 'danger', Math.random())
        }
    }

    const handleItemMove = (itemId, dragTime, newGroupOrder): void => {
        const group = resources[newGroupOrder];
        const filterCandidate = resources.length > 0 && resources.find(obj => obj.id === itemId);
        setResources(resources.map(candidate =>
            candidate.id === itemId
                ? Object.assign({}, candidate, {
                    start: dragTime,
                    end: dragTime + (candidate.end - candidate.start),
                    group: group.id
                })
                : candidate
        ));
        
        const payload = {
            eventId: filterCandidate.id,
            eventStart: dragTime,
            eventEnd: dragTime + (filterCandidate.end - filterCandidate.start),
            resourceMail: filterCandidate.mail
        }
        handleUpdate(payload);
    };

    const handleItemResize = (itemId, time, edge): void => {
        const filterCandidate = resources.find(obj => obj.id === itemId);
        setResources(resources.map(candidate =>
            candidate.id === itemId
                ? Object.assign({}, candidate, {
                    start: edge === "left" ? time : candidate.start,
                    end: edge === "left" ? candidate.end : time
                })
                : candidate
        ));
        const payload = {
            eventId: filterCandidate.id,
            eventStart: edge === "left" ? time : filterCandidate.start,
            eventEnd: edge === "left" ? filterCandidate.end : time,
            resourceMail: filterCandidate.mail
        }
        handleUpdate(payload);
    };

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd): void => {
        setVisibleTimeStart(visibleTimeStart)
        setVisibleTimeEnd(visibleTimeEnd);
    };

    const handleSelect = (itemId, e, time): void => {
        setResourceId(itemId);
        setIsModalOpen(true);
    }

    const handleCanvas = (groupId, time, e): void => {
        setCurrentGroup(groupId);
        setIsCreateModalOpen(true);
    }

    const handleEditEvent = (hide, item): void => {
        setCurrentItem(item);
        hide();
        setIsModalOpen(true);
    }

    const handleDeleteClick = (hide, item): void => {
        hide();
        setResourceId(item.id);
        setIsDeleteModalOpen(true);
    }

    const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }): JSX.Element => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
        const backgroundColor = itemContext.selected ? (itemContext.dragging ? "rgb(122, 184, 235)" : item.selectedBgColor) : item.bgColor;
        const borderColor = itemContext.resizing ? "rgb(122, 184, 235)" : item.color;
        return (
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div
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
                        onMouseDown: () => {
                            //Do something
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
                            whiteSpace: "nowrap",
                        }}
                    >

                        <h6>{itemContext.title}</h6>

                    </div>
                    {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
                </div>
            </Popover>
        );
    };

    return (
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
                    keys={TimelineKeys}
                    fullUpdate
                    itemTouchSendsClick={true}
                    stackItems
                    lineHeight={60}
                    itemHeightRatio={1.00}
                    showCursorLine
                    canMove={true}
                    canResize={"both"}
                    onItemDoubleClick={handleSelect}
                    onCanvasDoubleClick={handleCanvas}
                    defaultTimeStart={visibleTimeStart}
                    defaultTimeEnd={visibleTimeEnd}
                    visibleTimeStart={visibleTimeStart}
                    visibleTimeEnd={visibleTimeEnd}
                    onTimeChange={handleTimeChange}
                    onItemMove={handleItemMove}
                    onItemResize={handleItemResize}
                    itemRenderer={itemRenderer}
                >
                    <TimelineHeaders className="sticky" style={{ backgroundColor: "#1976d2" }}>
                        <SidebarHeader>
                            {({ getRootProps }) => {
                                return <div {...getRootProps()}>
                                    <p style={{ color: 'white', paddingTop: '15px', textAlign: 'center' }}>Associates</p>
                                </div>;
                            }}
                        </SidebarHeader>
                        <DateHeader unit="primaryHeader" />
                        <DateHeader />
                    </TimelineHeaders>
                </Timeline>
            </div>
        </div>
    )
}

export default TimelineComponent;