import React, {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {animated, useSprings} from 'react-spring';
import {aboutMe} from "../../../../textContent/TextContent";
import TextTypingTechnologies from "./TextTypingTechnologies";

const Wrapper = styled.div<{$visible: boolean}>`
  display: ${props => props.$visible ? 'block' : 'none'};
  position: absolute;
  width: 50vw;
  top: 0;
  height: 100vh;
`;

const InnerCentralWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 80%;
  text-align: left;
  color: black;
`;

const CommonWrapper = styled.div`
  overflow: hidden;
`;

const Headers = styled(animated.div)<{ $big: boolean }>`
  font-size: ${props => props.$big ? '50px' : '25px'};
  padding-bottom: ${props => props.$big ? '3%' : '7%'};
  font-family: 'MADE Evolve Bold';
`;

const AboutMe = styled(animated.div)`
  font-family: 'Relative-Book';
  font-size: 15px;
  text-align: left;
  padding-bottom: 10px;
`;

const InfoHeaders = styled(animated.div)`
  font-family: 'MADE Evolve Bold';
  font-size: 20px;
  padding-bottom: 5px;
`;

const Contacts = styled(animated.div)`
  
`;

type PropsType = {
    visible: boolean
}

const InfoBlock: React.FC<PropsType> = ({visible}) => {

    const [springs, setSprings] = useSprings(6, i =>({
        y: '-100%',
    }));

    const [isContentVisible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (visible) {
            setVisibility(true)
            setSprings(i => ({
               y: '0%',
                delay: i*200
           }))
        }
        if (!visible) {
            setSprings(i =>({
                y: '-100%',
                delay: (5-i)*200
            })).then(() =>setVisibility(false))
        }
    }, [visible, setSprings]);

    return(
        <Wrapper $visible={isContentVisible}>
            <InnerCentralWrapper>
                <CommonWrapper>
                    <Headers $big={true} style={springs[0]}>
                        Hello
                    </Headers>
                </CommonWrapper>
                <CommonWrapper>
                    <Headers $big={false} style={springs[1]}>
                        Is it me you're looking for?
                    </Headers>
                </CommonWrapper>
                {aboutMe.map((textContent, i) =>
                    <CommonWrapper key={i}>
                        <AboutMe style={springs[i+2]}>
                            {textContent}
                        </AboutMe>
                    </CommonWrapper>
                )}
                <CommonWrapper>
                    <InfoHeaders style={springs[5]}>
                        Technologies
                    </InfoHeaders>
                </CommonWrapper>
                <TextTypingTechnologies visible={visible}/>
            </InnerCentralWrapper>
        </Wrapper>
    )
}

export default React.memo(InfoBlock)