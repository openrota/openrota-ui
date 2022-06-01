import React from 'react';
import TableEmptyData from "@app/components/TableEmptyData/TableEmptyData";
import { useAuth } from "@app/context";

export default function PrivateRoute({ children, roles }: {
    children: JSX.Element;
    roles: Array<String>;
  }) {
    let userHasRequiredRoles = false;
    const auth = useAuth();
    auth?.getRoles().map(r => {
      for (const role of roles) {
        if (role == r) {
          userHasRequiredRoles = true;
          break;
        }
      }
    });
  
    if (!userHasRequiredRoles) {
      return <TableEmptyData />; // build your won access denied page (sth like 404)
    }
    return children;
  }