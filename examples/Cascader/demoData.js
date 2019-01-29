export const optionA = [
  {
    label: '甜点饮品',
    value: 'sweet',
    children: [
      { label: '甜品', value: 'sweetie' },
      { label: 'icecream', value: 'icecream' }
    ]
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
          { label: '羊蝎子火锅', value: 'sheep' }
        ]
      },
      {
        label: '面',
        value: 'noodle',
        children: [
          { label: '重庆小面', value: 'chongqing' },
          { label: '山西刀削面', value: 'xiao' }
        ]
      }
    ]
  },
  {
    label: '甜点饮品1',
    value: 'sweet1'
  },
  {
    label: '甜点饮品2',
    value: 'sweet2'
  }
]

export const assignedOptionA = ['food', 'hotpot', 'yunnan']

export const optionB = [
  {
    label: '甜点饮品',
    value: 19,
    child: [
      { label: '甜品', value: 167, child: [] },
      { label: '咖啡', value: 168, child: [] },
      { label: 'icecream', value: 169 }
    ]
  },
  {
    label: '美食',
    value: 22,
    child: [
      {
        label: '火锅',
        value: 221,
        child: [
          { label: '四川火锅', value: 500 },
          { label: '云南火锅', value: 501 },
          { label: '羊蝎子火锅', value: 502 }
        ]
      },
      {
        label: '面',
        value: 112,
        child: [
          { label: '重庆小面', value: 600 },
          { label: '山西刀削面', value: 701 }
        ]
      }
    ]
  }
];
export const assignedOptionB = [22, 112, 600]