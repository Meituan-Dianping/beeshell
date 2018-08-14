import { View, Text } from 'react-native';
import React from 'react';
import Component from '../modules/Cascader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


describe('renders correctly', () => {

  const options = [
    {
      label: '甜点饮品',
      value: 'sweet',
      children: [
        { label: '甜品', value: 'sweetie' },
        { label: 'icecream', value: 'icecream' },
      ],
    },
    {
      label: '美食',
      value: 'food',
      children: [
        {
          label: '火锅',
          value: 'hotpot',
          children: [
            { label: '四川火锅', value: 'sichuan' },
            { label: '云南火锅', value: 'yunnan' },
            { label: '羊蝎子火锅', value: 'sheep' },
          ],
        },
        {
          label: '面',
          value: 'noodle',
          children: [
            { label: '重庆小面', value: 'chongqing' },
            { label: '山西刀削面', value: 'xiao' },
          ],
        },
      ],
    },
    {
      label: '甜点饮品1',
      value: 'sweet1',
    },
    {
      label: '甜点饮品2',
      value: 'sweet2',
    }
  ];

  it('basic use', () => {

    const component = renderer.create(
      <Component
        style={{ flex: 1 }}
        options={options}
        itemSelectedStyle={{ color: 'green', backgroundColor: 'lightgreen' }}
        flexCols={[2, 1, 1]}
        structKeys={['name', 'value', 'child']}
        onSyncData={() => {
          return Promise.resolve([
            { label: '四川火锅', value: 'sichuan' },
            { label: '云南火锅', value: 'yunnan' },
            { label: '羊蝎子火锅', value: 'sheep' }
          ]);
        }}
        assignedOption={[11, 22, 33]}>
      </Component>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const instance = component.getInstance();

    instance.onSyncMakeRecursion(0, [11, 22], {});
    instance.showNextLevel({
      selected: false,
      label: '甜点饮品2',
      value: 'sweet2', children: [],
      level: 1
    });

    instance.showNextLevel({
      selected: false,
      label: '火锅',
      value: 'hotpot',
      children: [
        { label: '四川火锅', value: 'sichuan' },
        { label: '云南火锅', value: 'yunnan' },
        { label: '羊蝎子火锅', value: 'sheep' },
      ],
      level: 1
    });

    instance.onSelectFinish([
      { label: '四川火锅', value: 'sichuan' },
      { label: '云南火锅', value: 'yunnan' }
    ]);

    instance.onSelectChange([
      { label: '四川火锅', value: 'sichuan' },
      { label: '云南火锅', value: 'yunnan' }
    ]);
  });

  it('reject use', () => {
    const component = renderer.create(
      <Component
        style={{ flex: 1 }}
        options={options}
        itemSelectedStyle={{ color: 'green', backgroundColor: 'lightgreen' }}
        flexCols={[2, 1, 1]}
        structKeys={['name', 'value', 'child']}
        onSyncData={() => {
          return Promise.reject();
        }}
        assignedOption={[11, 22, 33]}>
      </Component>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    const instance = component.getInstance();

    instance.onSyncMakeRecursion(0, [11, 22], {});
    instance.showNextLevel({
      selected: false,
      label: '甜点饮品2',
      value: 'sweet2', children: [],
      level: 1
    });
  });

  it('init use', () => {
    const componentInit = renderer.create(
      <Component
        style={{ flex: 1 }}
        options={options}
        structKeys={['name', 'value', 'child']}
        onConfirm={(res) => { console.log(res) }}
        onChange={(res) => { console.log(res) }}
        assignedOption={['food', 'hotpot', 'sichuan']}
      >
      </Component>
    );
    const instanceInit = componentInit.getInstance();
    instanceInit.init(options);
    instanceInit.showNextLevel({
      selected: false,
      label: '甜点饮品2',
      value: 'sweet2', children: [],
      level: 1
    });
  });
});

