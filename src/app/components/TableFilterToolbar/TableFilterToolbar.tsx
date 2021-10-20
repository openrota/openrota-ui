import React, { useEffect, useState } from 'react';
import {
    Button,
    ButtonVariant,
    Bullseye,
    DataToolbar,
    DataToolbarItem,
    DataToolbarContent,
    DataToolbarFilter,
    DataToolbarToggleGroup,
    DataToolbarGroup,
    Dropdown,
    DropdownItem,
    DropdownPosition,
    DropdownToggle,
    InputGroup,
    Title,
    Select,
    SelectOption,
    SelectVariant,
    EmptyState,
    EmptyStateIcon,
    EmptyStateBody,
    EmptyStateSecondaryActions
} from '@patternfly/react-core';
import { SearchIcon, FilterIcon } from '@patternfly/react-icons';

const TableFilterToolbar: React.FunctionComponent = () => {

    const [currentCategory, setcurrentCategory] = useState<String>('Status');
    const [nameInput, setnameInput] = useState<String>('');
    const [inputValue, setinputValue] = useState<String>('');

    const [isFilterDropdownOpen, setisFilterDropdownOpen] = useState<Boolean>(false);
    const [isCategoryDropdownOpen, setisCategoryDropdownOpen] = useState<Boolean>(false);
    const [filter, setFilter] = useState<any>({ location: [], name: [], status: [] });

    const onDelete = (type = '', id = '') => {
        if (type) {
            const t = filter[type.toLowerCase()] = filter[type.toLowerCase()].filter(s => s !== id);
            setFilter(t);
        } else {
            setFilter({
                filters: {
                    location: [],
                    name: [],
                    status: []
                }
            });
        }
    };

    return (
        <React.Fragment>
            <DataToolbar
                id="data-toolbar-with-chip-groups"
                clearAllFilters={onDelete}
                collapseListedFiltersBreakpoint="xl"
            >
                <DataToolbarContent>
                    <DataToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
                        <DataToolbarGroup variant="filter-group">
                            {/* {this.buildCategoryDropdown()}
                            {this.buildFilterDropdown()} */}
                        </DataToolbarGroup>
                    </DataToolbarToggleGroup>
                </DataToolbarContent>
            </DataToolbar>
        </React.Fragment>

    )
};

export { TableFilterToolbar };
