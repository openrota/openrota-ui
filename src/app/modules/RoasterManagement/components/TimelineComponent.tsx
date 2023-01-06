import React from 'react';
import moment from "moment";
import axios from 'axios';
import Timeline, { TimelineHeaders, DateHeader, SidebarHeader } from "react-calendar-timeline";
import 'react-calendar-timeline/lib/Timeline.css';
import Popover from '@mui/material/Popover';
import { TimelineKeys, ResourceData, EventData } from '../constants';
import CalendarToolbar from './CalendarToolbar';

interface IOwnProps {
    calendarEvents: EventData[];
    resources: ResourceData[];
}

const TimelineComponent: React.FC<IOwnProps> = ({ calendarEvents, resources }) => {
    
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
    
    //Popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleTimeChange = (visibleTimeStart, visibleTimeEnd): void => {
        setVisibleTimeStart(visibleTimeStart)
        setVisibleTimeEnd(visibleTimeEnd);
    };

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
                            //  keys={TimelineKeys}
                            fullUpdate
                            //  itemTouchSendsClick={true}
                            stackItems
                            lineHeight={50}
                            itemHeightRatio={0.75}
                            showCursorLine
                            canMove={false}
                            rightSidebarWidth={200}
                            rightSidebarContent="Skills"
                            //  canResize={"both"}
                            // onItemDoubleClick={handleSelect}
                            // onCanvasDoubleClick={handleCanvas}
                            defaultTimeStart={visibleTimeStart}
                            defaultTimeEnd={visibleTimeEnd}
                            visibleTimeStart={visibleTimeStart}
                            visibleTimeEnd={visibleTimeEnd}
                            onTimeChange={handleTimeChange}
                        //  itemRenderer={itemRenderer}
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
                    </div>
                </div>)}
        </>
    )
}
export default TimelineComponent;