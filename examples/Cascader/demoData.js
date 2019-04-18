export const optionsX = [
  {
    label: '北京',
    id: 'beijing',
  },

  {
    label: '朝阳区',
    id: 'chaoyangqu',
    pId: 'beijing'
  },

  {
    label: '百子湾',
    id: 'baiziwan',
    pId: 'chaoyangqu'
  },

  {
    label: '海淀区',
    id: 'haidianqu',
    pId: 'beijing'
  },

  {
    label: '中关村',
    id: 'zhongguancun',
    pId: 'haidianqu'
  },

  {
    label: '上海',
    id: 'shanghai',
  },

  {
    label: '黄浦区',
    id: 'huangpuqu',
    pId: 'shanghai',
  },

  {
    label: '闸北区',
    id: 'zhabeiqu',
    pId: 'shanghai',
  },
]

export const optionsA = [
  {
    label: '甜点饮品',
    value: 'sweet',
    children: [
      { label: '甜品', value: 'sweetie' },
      { label: 'icecream', value: 'icecream' },
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
