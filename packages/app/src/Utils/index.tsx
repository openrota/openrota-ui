export const getFormattedProperties = (propertyDef: any, formName: string) => {
  console.log(formName);
  const formattedPropertyDef = [...propertyDef];
  for (const propDefn of formattedPropertyDef) {
    if (formName === 'candidates') {
      switch (propDefn.name) {
        case 'name':
          propDefn.gridWidthSm = 6;
          break;
        case 'experience':
          propDefn.gridWidthSm = 6;
          break;
        default:
          propDefn.gridWidthSm = 6;
          break;
      }
    }
  }

  return formattedPropertyDef;
};
