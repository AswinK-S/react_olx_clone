import React, { Fragment, useContext, useEffect } from 'react';
import Create from '../Components/Create/Create';
import { AuthContext } from '../store/Context';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

  const Navigate = useNavigate()
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (!user) Navigate('/login')   // if not logged-in, then redirect
  })

  return (
    <Fragment>
      {user ? <Create /> : ''}
    </Fragment>
  );
};

export default CreatePage;
