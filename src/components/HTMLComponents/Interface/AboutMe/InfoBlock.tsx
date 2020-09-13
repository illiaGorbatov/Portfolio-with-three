import React, {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import {animated, useSprings} from 'react-spring';
import {aboutMe, contacts} from "../../../../textAndPrijectsInfo/TextAndProjectsSettings";
import TextTypingTechnologies from "./TextTypingTechnologies";
import {isMobile} from "react-device-detect";

const Wrapper = styled.div<{ $visible: boolean }>`
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
  color: white;
`;

const CommonWrapper = styled.div`
  overflow: hidden;
`;

const Headers = styled(animated.div)<{ $big: boolean }>`
  font-size: ${props => props.$big ? '45px' : '30px'};
  padding-bottom: ${props => props.$big ? '3%' : '7%'};
  font-family: 'MADE Evolve Bold';
  @media (min-device-height: 500px) {
     font-size: ${props => props.$big ? '60px' : '35px'};
  }
`;

const AboutMe = styled(animated.div)`
  font-family: 'Relative-Book';
  font-size: 15px;
  text-align: left;
  padding-bottom: 10px;
  @media (min-device-height: 500px) {
     font-size: 20px;
  }
`;

const InfoHeaders = styled(animated.div)`
  font-family: 'MADE Evolve Bold';
  font-size: 20px;
  padding-top: 4%;
  padding-bottom: 5px;
  @media (min-device-height: 500px) {
     font-size: 30px;
  }
`;

const Contacts = styled(animated.div)`
  padding-top: 4%;
  display: flex;
  justify-items: left;
  width: 60%;
  max-width: 300px;
  justify-content: space-between;
`;

export const SingleContact = styled.a`
  display: inline-block;
  font-size: 15px;
  font-family: 'Relative-Book';
  text-align: left;
  position: relative;
  opacity: 0.6;
  transition: opacity .2s ease-in-out;
  text-decoration: none;
  color: white;
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 0;
    background-color: white;
    transition: width .2s ease-in-out;
  }
  &:hover:before {width: 100%};
  &:hover {opacity: 1};
  @media (min-device-height: 500px) {
     font-size: 20px;
  }
`;

type PropsType = {
    visible: boolean
}

const InfoBlock: React.FC<PropsType> = ({visible}) => {

    const [springs, setSprings] = useSprings(7, i => ({
        y: '-100%',
    }));

    const [isContentVisible, setVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (visible) {
            setVisibility(true)
            setSprings(i => ({
                y: '0%',
                delay: i < 6 ? i * 200 : 3200
            }))
        }
        if (!visible) {
            setSprings(i => ({
                y: '-100%',
                delay: (6 - i) * 200
            })).then(() => setVisibility(false))
        }
    }, [visible, setSprings]);

    return (
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
                {!isMobile && aboutMe.map((textContent, i) =>
                    <CommonWrapper key={i}>
                        <AboutMe style={springs[i + 2]}>
                            {textContent}
                        </AboutMe>
                    </CommonWrapper>
                )}
                <CommonWrapper>
                    <InfoHeaders style={springs[isMobile ? 2 : 5]}>
                        Technologies
                    </InfoHeaders>
                </CommonWrapper>
                <TextTypingTechnologies visible={visible}/>
                <CommonWrapper>
                    <Contacts style={springs[isMobile ? 3 : 6]}>
                        {contacts.map((item, i) =>
                            <SingleContact href={item.href} key={i}>
                                {item.header}
                            </SingleContact>
                        )}
                    </Contacts>
                </CommonWrapper>
            </InnerCentralWrapper>
        </Wrapper>
    )
}

export default React.memo(InfoBlock)