import React, { useContext } from 'react';
import {GlobalContext} from './Ctx';

const withLocalContext = Component => props => {
  const context = useContext(GlobalContext);

  return <Component context={context} {...props} />;
};

export default withLocalContext;
