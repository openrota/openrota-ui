import { Maybe, ResourceRequestSkillsProficiency, Skill } from '@app/models';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';


interface ViewResourceProps {
    resourceRequestObject: any;
    skills: Maybe<Maybe<Pick<ResourceRequestSkillsProficiency, "id" | "proficiencyLevel"> & { skill?: Maybe<Pick<Skill, "id" | "name">> | undefined; }>[]> | undefined
}

const ViewResourceRequest: React.FC<ViewResourceProps> = ({ resourceRequestObject, skills }) => {
    const [requestObj, setRequestObj] = useState<any>({});
    useEffect(() => {
        setRequestObj(resourceRequestObject);
    }, [resourceRequestObject])
    return (
        <React.Fragment>
            <Stack
                direction="column"
                justifyContent="space-evenly"
                alignItems="flex-start"
                spacing={0.5}
            >
                <Typography variant="h6">Requested By</Typography>
                <Typography >{requestObj?.requester?.firstName}</Typography>
                <Typography variant="h6">Requested Date</Typography>
                <Typography >{(new Date(requestObj?.createdAt)).toLocaleString()}</Typography>
                <Typography variant="h6">Pillar</Typography>
                <Typography >{requestObj?.pillar}</Typography>
                <Typography variant="h6">Project</Typography>
                <Typography >{requestObj?.project}</Typography>
                <Typography variant="h6">Task description</Typography>
                <Typography >{requestObj?.taskDetails}</Typography>
                <Typography variant="h6">Start Date</Typography>
                <Typography >{requestObj?.startDate}</Typography>
                <Typography variant="h6">End Date</Typography>
                <Typography >{requestObj?.endDate}</Typography>
                <Typography variant="h6">Skills required</Typography>
                <Typography >{skills?.map(s => <Chip key={s?.id}label={s.skill?.name} /> )}</Typography>
                <Typography variant="h6">Requested By</Typography>
                <Typography >{requestObj?.requester?.firstName}</Typography>
                {/* <DescriptionListGroup>
                    <DescriptionListTerm>Requested By</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.requester?.firstName}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Request Date</DescriptionListTerm>
                    <DescriptionListDescription>{(new Date(requestObj?.createdAt)).toLocaleString()}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Pillar</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.pillar}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Project</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.project}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Task description</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.taskDetails}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Start Date</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.startDate}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>End Date</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.endDate}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Skills required</DescriptionListTerm>
                    <DescriptionListDescription>{skills?.map(s => <Chip key={s?.id} isReadOnly>{s.skill?.name}</Chip>)}</DescriptionListDescription>
                </DescriptionListGroup> */}
            </Stack>
        </React.Fragment>
    );

}
export default ViewResourceRequest;