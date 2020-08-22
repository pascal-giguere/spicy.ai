import React from 'react';
import styled from 'styled-components';
import { PropertiesListItem } from './PropertiesListItem';
import { PropertyDisplayItem } from '../../models/Property';

const Container = styled.div`
  box-sizing: border-box;
  max-width: 660px;
  margin: auto;
  padding: 60px 0;

  @media (max-width: 767px) {
    width: 350px;
    padding: 30px 0;
  }
`;

const Label = styled.div`
  font-weight: 900;
  font-size: 18px;
  margin-bottom: 40px;

  @media (max-width: 767px) {
    font-size: 14px;
    margin-bottom: 30px;
  }
`;

type Props = {
  properties: PropertyDisplayItem[];
  onFavoriteChanged: (propertyId: string, isFavorite: boolean) => void;
};

export const PropertiesList = (props: Props) => (
  <Container>
    <Label>{`${props.properties.length} properties found:`}</Label>
    {props.properties.map((property: PropertyDisplayItem) => (
      <PropertiesListItem
        key={property.id}
        property={property}
        onFavoriteChanged={(isFavorite: boolean) => props.onFavoriteChanged(property.id, isFavorite)}
      />
    ))}
  </Container>
);
