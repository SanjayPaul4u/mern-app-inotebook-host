import React from "react";
import Notes from "./Notes";



const Home = (props) => {
  const {showAlert} = props;
  
  return (
      <div className="row pt-5">
        <div className="col-10 col-md-10 col-xxl-10 mx-auto">

      {/* add note div */}
      
      {/* your note div */}
      <Notes showAlert={showAlert}/>
      

      </div>
    </div>
  );
};

export default Home;
