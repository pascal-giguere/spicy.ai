import React from 'react';
import styled, { css } from 'styled-components';
import { PropertyDisplayItem } from '../../models/Property';
import { RiskLevel } from '../../models/Risk';

const Container = styled.div`
  display: flex;
  margin: 35px 0;

  @media (max-width: 767px) {
    margin: 20px 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee;

  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`;

const Image = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 18px 0;
  box-sizing: border-box;

  @media (max-width: 767px) {
    padding: 8px 0;
    height: 75px;
  }
`;

const LeftColumn = styled.div`
  padding-left: 40px;
  width: 240px;

  @media (max-width: 767px) {
    padding-left: 18px;
    width: 125px;
  }
`;

const NameLabel = styled.div`
  font-size: 22px;
  margin-bottom: 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 767px) {
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

const Label = styled.div`
  font-family: 'Futura LT', sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;

  @media (max-width: 767px) {
    font-size: 8px;
    letter-spacing: 0;
  }
`;

const CoordinatesLabel = styled(Label)`
  line-height: 17px;
  color: #ea5a46;

  @media (max-width: 767px) {
    line-height: 13px;
  }
`;

const RiskLevelContainer = styled.div`
  width: 150px;
  padding: 0 30px;
  text-align: center;

  @media (max-width: 767px) {
    width: 65px;
    padding: 0 12px;
  }
`;

const RiskLevelLabel = styled(Label)`
  margin-top: 2px;
`;

const RiskLevelValue = styled(Label)`
  color: #ea5a46;
  line-height: 25px;

  @media (max-width: 767px) {
    line-height: 20px;
  }
`;

const RiskLevelIcons = styled.div`
  margin-top: -4px;
  text-align: center;
  font-size: 20px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

const FavoriteContainer = styled.div<{ isFavorite: boolean }>`
  padding: 3px 0;
  cursor: pointer;
  transition: filter 200ms;

  @media (max-width: 767px) {
    padding: 2px 0 2px 12px;
  }

  ${(props) =>
    !props.isFavorite &&
    css`
      filter: grayscale(1) opacity(0.3);

      &:hover {
        filter: grayscale(1) opacity(0.6);
      }
    `}
`;

const FavoriteIcon = styled.div`
  display: inline-block;
  width: 100%;
  margin-left: -1px;
  height: 43px;
  text-align: center;
  font-size: 32px;

  @media (max-width: 767px) {
    margin-left: 0;
    height: 29px;
    font-size: 22px;
  }
`;

const FavoriteLabel = styled(Label)``;

type Props = {
  property: PropertyDisplayItem;
  onFavoriteChanged: (isFavorite: boolean) => void;
};

export const PropertiesListItem = (props: Props) => {
  const { name, latitude, longitude, overlayImageUrl, riskLevel, isFavorite } = props.property;
  return (
    <Container>
      <ImageWrapper>
        <Image src={overlayImageUrl} alt='Property' />
      </ImageWrapper>
      <Content>
        <LeftColumn>
          <NameLabel>{name}</NameLabel>
          <CoordinatesLabel>{`Latitude: ${latitude}°`}</CoordinatesLabel>
          <CoordinatesLabel>{`Longitude: ${longitude}°`}</CoordinatesLabel>
        </LeftColumn>
        <RiskLevelContainer>
          <RiskLevelLabel>Risk level</RiskLevelLabel>
          <RiskLevelValue>{riskLevel}</RiskLevelValue>
          <RiskLevelIcons>{riskLevelEmojis(riskLevel)}</RiskLevelIcons>
        </RiskLevelContainer>
        <FavoriteContainer isFavorite={isFavorite} onClick={() => props.onFavoriteChanged(!isFavorite)}>
          <FavoriteIcon>
            <span role='img' aria-label='Favorite'>
              ⭐
            </span>
          </FavoriteIcon>
          <FavoriteLabel>Favorite</FavoriteLabel>
        </FavoriteContainer>
      </Content>
    </Container>
  );
};

function riskLevelEmojis(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case RiskLevel.mild:
      return '🌶';
    case RiskLevel.spicy:
      return '🌶 🌶';
    case RiskLevel.hot:
      return '🌶 🌶 🌶';
  }
}
