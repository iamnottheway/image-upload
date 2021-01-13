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
        DropAreaComponent={<DropArea />}
        onEnterDropArea={() => console.log("its on top")}
        onLeaveDropArea={() => console.log("its gone")}
        onFileLoad={() => console.log("loaded")}
        onComplete={onComplete}
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
