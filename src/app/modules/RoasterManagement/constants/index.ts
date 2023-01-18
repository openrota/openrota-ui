export const TimelineKeys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
  };

export interface ResourceData {
  bgColor?: string,
  id: string,
  rightTitle?: string,
  title: string,
  mail?: string,
  employeeId?: string | ''
}

export interface EventData {
  title: string,
  start_time: string,
  end_time: string,
  group: number,
  id: number,
  description: string | '',
  color: any,
  bgColor: string,
  type: string,
  eventId: number,
  resourceId: number
}

export enum CalendarType {
  ManagerView = 'ManagerView',
  ResourceView = 'ResourceView'
}