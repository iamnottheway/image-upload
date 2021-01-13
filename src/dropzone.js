import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

import PreviewImageCard from "./previewCard";

const types = {
  idle: "idle",
  over: "over",
  finished: "finished"
};

const DropFileUploader = ({
  width,
  height,
  onEnterDropArea,
  onLeaveDropArea,
  DropAreaComponent,
  onComplete
}) => {
  const [currentState, setCurrentState] = useState(types.idle);
  const [error, setError] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  function dragOver(event) {
    event.preventDefault();
    setCurrentState(types.over);
  }

  function dragEnter(event) {
    event.preventDefault();
    if (onEnterDropArea !== undefined) {
      onEnterDropArea();
    }
  }

  function dragLeave(event) {
    event.preventDefault();
    setCurrentState(types.idle);
    if (onLeaveDropArea !== undefined) {
      onLeaveDropArea();
    }
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function(e) {
        const resp = {
          data: reader.result,
          file: file,
          name: file.name,
          status: "complete",
          size: file.size
        };

        resolve(resp);
      };

      reader.onerror = function(error) {
        reject(error);
      };
    });
  }

  function dragDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const supportedFileTypes = ["image/jpeg", "image/png"];

    setCurrentState(types.idle);
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        if (supportedFileTypes.includes(files[i].type)) {
          error && setError(false);
          readFile(files[i]).then(response => {
            setUploadedImages(prevState => [...prevState, response]);
          });
        } else {
          setError(true);
        }
      }
    }
  }

  return (
    <DropWrapper>
      <DropArea
        width={width}
        height={height}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={dragDrop}
        currentState={currentState}
      >
        {error && (
          <ErrorWrapper>
            <ErrorMessage>
              Format not supported. Please upload jpg/png.
            </ErrorMessage>
            <ErrorButton onClick={() => setError(false)}>Got it!</ErrorButton>
          </ErrorWrapper>
        )}

        {DropAreaComponent !== undefined && !error ? (
          <>
            {React.cloneElement(DropAreaComponent, {
              state: currentState
            })}
          </>
        ) : (
          !error && (
            <>
              {currentState === types.idle && (
                <Heading>Drag and drop an image to Upload</Heading>
              )}
              {currentState === types.over && <h3>Let it go...</h3>}
              {currentState === types.finished && <h3>Done!</h3>}
            </>
          )
        )}
      </DropArea>
      {uploadedImages.length > 0 && (
        <Container>
          <UploadedList>
            {uploadedImages.map((image, index) => {
              return <PreviewImageCard key={index} image={image} />;
            })}
          </UploadedList>
        </Container>
      )}
    </DropWrapper>
  );
};

export default DropFileUploader;

const ErrorButton = styled.button`
  background: #2579ff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

const ErrorWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  text-align: center;
  max-width: 60%;
  color: #b2bae1;
`;

const FadeIn = keyframes`
  from {  transform: translate(0px, 50px);opacity: 0}
  to {  transform: translate(0px, 0px);opacity: 1}
`;

const Container = styled.div`
  animation: ${FadeIn} 0.2s ease-in-out;
`;

const Heading = styled.h3`
  max-width: 70%;
  font-size: 20px;
  font-style: normal;
  color: #000000;
  text-align: center;
`;

const DropWrapper = styled.div`
  padding: 30px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 14px;
`;

const DropArea = styled.div`
  min-width: ${props => (props.width ? `${props.width}px` : "350px")};
  min-height: ${props => (props.height ? `${props.height}px` : "250px")};
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: ${props =>
    props.currentState === types.over
      ? "rgba(97, 160, 255, 0.1);"
      : props.currentState === types.idle
      ? "#fff"
      : props.currentState === types.finished && "#fff"};

  border: ${props =>
    props.currentState === types.over
      ? "2px dashed rgba(56, 76, 255, 0.21)"
      : props.currentState === types.idle
      ? "2px dashed rgba(56, 76, 255, 0.21)"
      : props.currentState === types.finished && " 2px dashed #333"};

  box-shadow: ${props =>
    props.currentState === types.over
      ? "0px 4px 20px rgba(68, 104, 174, 0.17)"
      : ""};
  transition: 0.3s ease-in-out;
`;

const UploadedList = styled.div`
  max-height: 200px;
  overflow: scroll;
  box-sizing: border-box;
  margin: 10px 0px;
  padding: 10px 20px;
  background: #f7f7fb;
  border-radius: 6px;
  transition: max-height 0.7s ease-in-out;
`;
