import React from 'react';
import { PropertiesContainer } from '../components/properties/PropertiesContainer';
import { Header, Page } from '../components/Header';

export const IndexPage = () => (
  <div>
    <Header selectedPage={Page.index} />
    <PropertiesContainer />
  </div>
);
