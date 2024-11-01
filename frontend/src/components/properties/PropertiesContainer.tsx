import React, { Dispatch, useEffect, useState, SetStateAction } from 'react';
import styled from 'styled-components';
import { PropertiesList } from './PropertiesList';
import { SearchParams } from '../../utils/queryParams';
import { Property, PropertyDisplayItem } from '../../models/Property';
import { findAllProperties, searchProperties } from '../../utils/apiClient';
import PuffLoader from 'react-spinners/PuffLoader';
import { readFavoriteProperties, setFavoriteProperty, unsetFavoriteProperty } from '../../utils/localStorage';

const LoaderContainer = styled.div`
  width: 60px;
  margin: 100px auto;
`;

type Props = {
  filterFavorites?: boolean;
  searchParams?: SearchParams;
};

export const PropertiesContainer = (props: Props) => {
  const [properties, setProperties] = useState<Property[]>();
  const persistedPropertyIds = readFavoriteProperties();
  const [favoritePropertyIds, setFavoritePropertyIds] = useState<Set<string>>(persistedPropertyIds);

  useEffect(() => {
    (async () => {
      try {
        let fetchedProperties: Property[];

        if (props.searchParams) {
          const { lat, lon, dist } = props.searchParams;
          fetchedProperties = await searchProperties(lat, lon, dist);
        } else {
          fetchedProperties = await findAllProperties();
        }
        setProperties(fetchedProperties);
      } catch (error) {
        console.error(`Failed to fetch properties: ${error.message}`);
      }
    })();
  }, [props.searchParams]);

  if (!properties) {
    return (
      <LoaderContainer>
        <PuffLoader color='#ea5a46' />
      </LoaderContainer>
    );
  }

  const filteredProperties: Property[] = props.filterFavorites
    ? properties.filter((property: Property) => favoritePropertyIds.has(property.id))
    : properties;

  const propertyDisplayItems: PropertyDisplayItem[] = filteredProperties.map((property: Property) =>
    PropertyDisplayItem.fromProperty(property, favoritePropertyIds)
  );
  return (
    <PropertiesList
      properties={propertyDisplayItems}
      onFavoriteChanged={(propertyId: string, isFavorite: boolean) =>
        handleFavoriteChanged(propertyId, isFavorite, setFavoritePropertyIds)
      }
    />
  );
};

function handleFavoriteChanged(
  propertyId: string,
  isFavorite: boolean,
  setFavoritePropertyIds: Dispatch<SetStateAction<Set<string>>>
): void {
  let updatedFavoritePropertyIds: Set<string>;
  if (isFavorite) {
    updatedFavoritePropertyIds = setFavoriteProperty(propertyId);
  } else {
    updatedFavoritePropertyIds = unsetFavoriteProperty(propertyId);
  }
  setFavoritePropertyIds(updatedFavoritePropertyIds);
}
