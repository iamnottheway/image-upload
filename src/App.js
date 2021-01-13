import React from "react";
import styled from "styled-components";
import DropFileUploader from "./dropzone";
import Illustration from "./illustration";

const DropArea = ({ state }) => {
  return (
    <Container>
      <Illustration state={state}></Illustration>
      {state === "idle" && <h3>Drag and drop images here</h3>}
      {state === "over" && <h3>yes, please drop it</h3>}
    </Container>
  );
};

function App() {
  const onComplete = () => {
    console.log("nice!");
  };

  return (
    <Wrapper>
      <DropFileUploader
        width={350}
        height={240}
        DropAreaComponent={<DropArea />} // Use a custom component.
        onEnterDropArea={() => console.log("its on top")} // run custom code when entering drop area
        onLeaveDropArea={() => console.log("its gone")} // run custom code when leaving drop area
        onFileLoad={() => console.log("loaded")} // run custom code when a file is loaded
        onComplete={() => {}} // run custom code when after upload is complete
      ></DropFileUploader>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background: #fff1f1;
`;

const Container = styled.div`
  display: grid;
  place-items: center;
`;

export default App;
