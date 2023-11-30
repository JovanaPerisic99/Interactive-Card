import "./App.css";
import Sidebar from "./Components/Sidebar";
import Form from "./Components/Form";
import ThankYouCard from "./Components/ThankYouCard";
import React, { useState } from "react";
import { FormContextProvider } from "./context/formContext";

const App = ()=> {
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleView = ():void => {
    setShowResult(!showResult);
  };

  return (
    <FormContextProvider>
      <div className="content">
        <Sidebar />
        {!showResult && <Form handleView={handleView} />}
        {showResult && <ThankYouCard handleView={handleView} />}
      </div>
    </FormContextProvider>
  );
}

export default App;
