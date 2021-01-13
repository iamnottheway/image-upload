import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const PreviewImageCard = ({ image }) => {
  const [progress, setProgress] = useState(0);
  function upload(formData) {
    axios({
      method: "POST",
      url: "https://upload-backend-ben90193.herokuapp.com/upload",
      data: formData,
      onUploadProgress: event => {
        const completedPercent = Math.round((event.loaded / event.total) * 100);
        setProgress(completedPercent);
      },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(resp => {
      console.log(resp);
    });
  }

  React.useEffect(() => {
    const formData = new FormData();
    formData.append("file", image.file);
    upload(formData);
  }, [image.file]);

  return (
    <PreviewCard>
      <ImagePreview
        src={image.status === "complete" ? image.data : ""}
      ></ImagePreview>
      <ProgressDisplayBox>
        <FileName>{image.name}</FileName>
        <ProgressWrapper>
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
          </ProgressBarContainer>
          <ProgressText>{progress}%</ProgressText>
        </ProgressWrapper>
      </ProgressDisplayBox>
    </PreviewCard>
  );
};

export default PreviewImageCard;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProgressText = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin: 0px 5px;
`;

const ProgressDisplayBox = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  position: relative;
  background: #ebf0f8;
  border-radius: 4px;
  overflow: hidden;
  margin: 5px 0px;
`;

const ProgressBar = styled.div`
  width: ${props => (props.progress ? `${props.progress}%` : "0%")};
  height: 100%;
  position: absolute;
  background: #3784ff;
  border-radius: 4px;
  transition: width 0.5s ease-in;
`;

const FileName = styled.p`
  margin: 7px 0px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const ImagePreview = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  background: #ffe8de;
  border: 2px solid #ffffff;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const PreviewCard = styled.div`
  width: 100%;
  height: auto;
  margin: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
