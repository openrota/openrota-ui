import React, { useState, useEffect, useCallback } from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextInput,
  InputGroup,
  Gallery,
  Card,
  Title,
  Button,
  CardHeader,
  CardActions,
  Dropdown,
  KebabToggle,
  DropdownItem,
  CardTitle,
  CardBody,
  Toolbar,
  ToolbarGroup,
  ToolbarContent,
  ToolbarItem,
  ToolbarToggleGroup,
  ToolbarFilter,
  SelectOption,
  Select,
  Pagination
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
// import TrashIcon from '@patternfly/react-icons/dist/js/icons/trash-icon';
import FilterIcon from '@patternfly/react-icons/dist/js/icons/filter-icon';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const swaggerIcon = "https://www.patternfly.org/v4/images/camel-swagger-java_200x150.206c8d562e20fedb65b226a02db49611.png";

interface Candidates {
  id?: number;
  name?: string;
  icon?: string;
  description?: string;
  selected?: boolean
}

export const CandidateManagement = () => {
  const [candidates, setCandidates] = useState<Candidates[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItemCount, setTotalItemCount] = useState(10);
  const [error, setError] = useState("")
  const [searchValue, setSearchValue] = useState('');
  const [types, setTypes] = useState<string[]>(["Beginner", "Intermediate", "Advanced"]);
  const [typesToggled, setTypesToggled] = useState(false);
  const [cardsActionsToggled, setCardsActionToggled] = useState(false)

  const { t } = useTranslation();

  // const clearAllFilters = useCallback(() => {
  //   setSearchValue('');
  //   setTypes([]);
  // }, []);


  const onCardKebabDropdownSelect = useCallback((key, status) => {
    console.log(key)
    setCardsActionToggled(status);
  }, []);

  const toggleCardAction = useCallback((key, status) => {
    console.log(key)
    setCardsActionToggled(status);
  }, []);


  const toggleTypes = useCallback(() => setTypesToggled(prev => !prev), []);


  const onSelectType = useCallback(
    (_, status) =>
      setTypes(prev =>
        prev.includes(status)
          ? prev.filter(s => s !== status)
          : [...prev, status]
      ),
    []
  );

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/jenny-s51/cardviewdata/posts?_page=${page}&_limit=${perPage}`)
      .then(resp => resp.json())
      .then(candidate => { setCandidates(candidate); setPerPage(perPage); setPage(page) })
      .catch(err => setError(err));
  }, []);


  const typeMenuItems = [
    <SelectOption key="Beginner" value="Beginner" />,
    <SelectOption key="Intermediate" value="Intermediate" />,
    <SelectOption key="Advanced" value="Advanced" />
  ];
  console.log(setTotalItemCount)
  console.log(error)
  const toggleGroupItems = (
    <>
      <ToolbarItem>
        <InputGroup>
          <TextInput
            name="searchCandidate"
            id="searchCandidate"
            type="search"
            aria-label="Search Candidate"
            onChange={setSearchValue}
            value={searchValue}
          />
          <Button
            variant={'control'}
            aria-label="search button for search input"
          >
            <SearchIcon />
          </Button>
        </InputGroup>
      </ToolbarItem>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          chips={types}
          deleteChip={onSelectType}
          deleteChipGroup={() => setTypes([])}
          categoryName="Skills"
        >
          <Select
            variant={'checkbox'}
            aria-label="Skills"
            onToggle={toggleTypes}
            onSelect={onSelectType}
            selections={types}
            isOpen={typesToggled}
            placeholderText="Skills"
          >
            {typeMenuItems}
          </Select>
        </ToolbarFilter>
      </ToolbarGroup>
    </>
  );


  const toolbarItems = (
    <>
      <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
        {toggleGroupItems}
      </ToolbarToggleGroup>

      <ToolbarGroup variant="icon-button-group">
        <ToolbarItem>
          <NavLink
            className="pf-c-button pf-m-primary"
            to={'/create-candidate'}
          >
            Create Candidate
          </NavLink>
        </ToolbarItem>
      </ToolbarGroup>
    </>
  );
  const dropdownItems = [
    <DropdownItem key="link">Link</DropdownItem>,
    <DropdownItem key="action" component="button">
      Action
    </DropdownItem>,
    <DropdownItem key="disabled link" isDisabled>
      Disabled Link
    </DropdownItem>,
    <DropdownItem key="disabled action" isDisabled component="button">
      Disabled Action
    </DropdownItem>,

    <DropdownItem key="separated link">Separated Link</DropdownItem>,
    <DropdownItem key="separated action" component="button">
      Separated Action
    </DropdownItem>
  ];

  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Title headingLevel="h1">{t('candidateManagement')}</Title>
          <Text component="p">This is a demo that showcases Patternfly Cards.</Text>
        </TextContent>
        <Toolbar id="toolbar-group-types">
          <ToolbarContent>{toolbarItems}</ToolbarContent>
        </Toolbar>
      </PageSection>
      <PageSection isFilled>
        <Gallery hasGutter>
          {candidates.map((candidate, key) => (
            <Card isHoverable isCompact key={candidate.name}>
              <CardHeader>
                {/* <Avatar src={imgAvatar} alt="Avatar image" /> */}
                <img src={swaggerIcon} alt={`${candidate.name} icon`} style={{ maxWidth: '60px' }} />
                <CardActions>
                  <Dropdown
                    onSelect={(cardsActionsToggled) => onCardKebabDropdownSelect(key, cardsActionsToggled)}
                    toggle={<KebabToggle onToggle={(key) => { toggleCardAction(key, cardsActionsToggled) }} />}
                    isOpen={cardsActionsToggled}
                    isPlain
                    dropdownItems={dropdownItems}
                    position={'right'}
                  />
                </CardActions>
              </CardHeader>
              <CardTitle>{candidate.name}</CardTitle>
              <CardBody>{candidate.description}</CardBody>
            </Card>
          ))}
        </Gallery>
      </PageSection>
      <PageSection isFilled={false} sticky="bottom" padding={{ default: 'noPadding' }} variant="light">
        <Pagination
          itemCount={totalItemCount}
          page={page}
          perPage={perPage}
          // onPerPageSelect={onPerPageSelect}
          // onSetPage={onSetPage}
          variant="bottom"
        />
      </PageSection>
    </>
  )
}