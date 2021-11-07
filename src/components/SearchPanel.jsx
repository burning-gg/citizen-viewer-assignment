import React, { useState, useEffect } from 'react';
import { Select } from 'antd';

import { connect } from 'react-redux';
import {
  getStreets,
  getHouses,
  getFlats,
  setLocation,
  setAddressId,
} from '../actions/searchAction';
import { getClients } from '../actions/clientAction';

const { Option } = Select;

const SearchPanel = ({
  getStreets,
  getHouses,
  getFlats,
  setLocation,
  setAddressId,
  getClients,
  search: { streets, houses, flats, loading },
}) => {
  const [street, setStreet] = useState({
    id: null,
    name: null,
  });
  const [house, setHouse] = useState({
    id: null,
    name: null,
  });
  const [flat, setFlat] = useState({
    id: null,
    name: null,
  });
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    getStreets();
  }, [getStreets]);

  useEffect(() => {
    if (streets.length > 0) getHouses(street.id);
  }, [getHouses, streets, street.id]);

  useEffect(() => {
    if (houses.length > 0) getFlats(house.id);
  }, [getFlats, houses, house.id]);

  useEffect(() => {
    if (flat.id !== null) {
      getClients(flat.id);
      setLocation(newLocation);
      setAddressId(flat.id);
    }
  }, [getClients, setLocation, setAddressId, newLocation, flat.id]);

  const onChangeStreet = (value) => {
    setStreet({
      id: value.value,
      name: value.label,
    });
    setHouse({
      id: null,
      name: null,
    });
    setFlat({
      id: null,
      name: null,
    });
  };

  const onChangeHouse = (value) => {
    setHouse({
      id: value.value,
      name: value.label,
    });
    setFlat({
      id: null,
      name: null,
    });
  };

  const onChangeFlat = (value) => {
    setFlat({
      id: value.value,
      name: value.label,
    });
    setNewLocation(`ул. ${street.name}, ${house.name}, ${value.label}`);
  };

  const onFilterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <div className='select-container'>
      <div className='select-title'>Поиск и просмотр жильцов</div>
      <div className='select-filters'>
        <Select
          showSearch
          labelInValue
          className='select-street'
          placeholder='Улица'
          value={{ value: street.id, label: street.name }}
          optionFilterProp='children'
          onChange={(value) => onChangeStreet(value)}
          filterOption={(input, option) => onFilterOption(input, option)}
          loading={loading ? true : false}
        >
          {streets?.map((street) => (
            <Option value={street.id} key={street.id}>
              {street.name}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          labelInValue
          className='select-house'
          placeholder='Дом'
          value={{ value: house.id, label: house.name }}
          disabled={street.id === null ? true : false}
          optionFilterProp='children'
          onChange={(value) => onChangeHouse(value)}
          filterOption={(input, option) => onFilterOption(input, option)}
          loading={loading ? true : false}
        >
          {houses?.map((house) => (
            <Option value={house.id} key={house.id}>
              {house.name}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          labelInValue
          className='select-flat'
          placeholder='Квартира'
          value={{ value: flat.id, label: flat.name }}
          disabled={house.id === null ? true : false}
          optionFilterProp='children'
          onChange={(value) => onChangeFlat(value)}
          filterOption={(input, option) => onFilterOption(input, option)}
          loading={loading ? true : false}
        >
          {flats?.map((flat) => (
            <Option value={flat.id} key={flat.id}>
              {flat.name}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.searchReducer,
});

export default connect(mapStateToProps, {
  getStreets,
  getHouses,
  getFlats,
  setLocation,
  setAddressId,
  getClients,
})(SearchPanel);
