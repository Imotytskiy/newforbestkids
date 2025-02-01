import React, { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [state, setState] = useState(/* initial state */);

  return (
    <AdminContext.Provider value={{ state, setState }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
