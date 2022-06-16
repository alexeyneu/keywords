import * as React from 'react';
import styled from "styled-components";

const VideoContainer = styled.div`
    max-width: 82rem;
    width: 100%;
  
      iframe{
        width: 100%;
        min-height: 420px;
        height: 100%;
      }
`

export const VideoModal = () => {
    return(
        <VideoContainer>
            <iframe
                    src="https://www.youtube.com/embed/tgbNymZ7vqY">
            </iframe>
        </VideoContainer>
    )
}
