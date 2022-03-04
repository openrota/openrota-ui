import { Maybe, ResourceRequestSkillsProficiency, Skill } from '@app/models';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface ViewResourceProps {
    resourceRequestObject: any;
    skills: Maybe<Maybe<Pick<ResourceRequestSkillsProficiency, "id" | "proficiencyLevel"> & { skill?: Maybe<Pick<Skill, "id" | "name">> | undefined; }>[]> | undefined
}

const CandidateProfileView: React.FC<ViewResourceProps> = ({ resourceRequestObject, skills }) => {
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
                <Typography variant="h6">Name</Typography>
                <Typography >{requestObj?.requester?.firstName}</Typography>
                <Typography variant="h6">Email</Typography>
                <Typography >{(new Date(requestObj?.createdAt)).toLocaleString()}</Typography>
                <Typography variant="h6">Designation</Typography>
                <Typography >{requestObj?.pillar}</Typography>
                <Typography variant="h6">Total Work Experience</Typography>
                <Typography >{requestObj?.project}</Typography>
                <Typography variant="h6">Skills required</Typography>
                <Typography >{skills?.map(s => <Chip key={s?.id}label={s.skill?.name} /> )}</Typography>
                {/* <DescriptionListGroup>
                    <DescriptionListTerm>Name</DescriptionListTerm>
                    <DescriptionListDescription></DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Email</DescriptionListTerm>
                    <DescriptionListDescription>{(new Date(requestObj?.createdAt)).toLocaleString()}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Designation</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.pillar}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Total Work Experience</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.project}</DescriptionListDescription>
                </DescriptionListGroup>
                <DescriptionListGroup>
                    <DescriptionListTerm>Skills required</DescriptionListTerm>
                    <DescriptionListDescription>{skills?.map(s => <Chip key={s?.id} isReadOnly>{s.skill?.name}</Chip>)}</DescriptionListDescription>
                </DescriptionListGroup> */}
            </Stack>
        </React.Fragment>
    );

}
export default CandidateProfileView;