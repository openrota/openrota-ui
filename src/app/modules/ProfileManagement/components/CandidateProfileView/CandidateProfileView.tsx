import { Maybe, ResourceRequestSkillsProficiency, Skill } from '@app/models';
import { Chip, DescriptionList, DescriptionListDescription, DescriptionListGroup, DescriptionListTerm } from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';


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
            <DescriptionList>
                <DescriptionListGroup>
                    <DescriptionListTerm>Name</DescriptionListTerm>
                    <DescriptionListDescription>{requestObj?.requester?.firstName}</DescriptionListDescription>
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
                </DescriptionListGroup>
            </DescriptionList>
        </React.Fragment>
    );

}
export default CandidateProfileView;