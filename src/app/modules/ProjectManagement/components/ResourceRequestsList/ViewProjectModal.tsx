import React from 'react';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';


interface ViewResourceProps {
    requestId: string | null;
}

const ViewResourceRequest: React.FC<ViewResourceProps> = ({ requestId }) => {
    return (
        <React.Fragment>
            lets enjoy {requestId}
        </React.Fragment>
    );

}
export default ViewResourceRequest;