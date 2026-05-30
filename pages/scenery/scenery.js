// 风光设施页 - 成员B负责（风光+设施一体）
Page({
  data: {
    // 校园风景数据
    sceneryList: [
      {
        id: 1,
        name: '校园春景',
        image: '/images/chunjing.jpg',
        description: '南浔校区春日美景，绿意盎然',
        type: 'scenery'
      },
      {
        id: 2,
        name: '北大门',
        image: '/images/beimen.jpg',
        description: '南浔校区正门，气势恢宏',
        type: 'scenery'
      },
      {
        id: 3,
        name: '教学科研综合楼',
        image: '/images/jiaoxuelou.jpg',
        description: '钱塘校区主要教学楼',
        type: 'scenery'
      },
      {
        id: 4,
        name: '谦湖雪景',
        image: '/images/xuejing.jpg',
        description: '南浔校区谦湖冬景',
        type: 'scenery'
      },
      {
        id: 5,
        name: '校园秋景',
        image: '/images/qiujing.jpg',
        description: '钱塘校区秋日风光',
        type: 'scenery'
      },
      {
        id: 6,
        name: '遨游雕塑',
        image: '/images/aoyou.jpg',
        description: '钱塘校区标志性雕塑',
        type: 'scenery'
      },
      {
        id: 7,
        name: '游鲤伴学',
        image: '/images/youli.jpg',
        description: '钱塘校区池塘锦鲤',
        type: 'scenery'
      },
      {
        id: 8,
        name: '晚霞',
        image: '/images/wanxia.jpg',
        description: '南浔校区夕阳西下',
        type: 'scenery'
      }
    ],

    // 设施数据（来自学校官网）
    facilitiesList: [
      {
        id: 101,
        name: '图书馆（钱塘校区）',
        image: '/images/lib-new4.jpg',
        description: '杭州市钱塘区2号大街508号。普通阅览室、书库开放至22:30。',
        openTime: '北门 7:00-22:30 | 南门 8:00-16:30',
        isOpen: true,
        location: '钱塘校区',
        notice: '密集书库、水利特藏库需预约开放',
        type: 'facility'
      },
      {
        id: 102,
        name: '图书馆（南浔校区）',
        image: '/images/lib-new2.jpg',
        description: '湖州市南浔区联谊路68号。书库阅览区3-6楼开放至22:00。',
        openTime: '北门 7:00-22:00 | 服务中心 8:00-17:30',
        isOpen: true,
        location: '南浔校区',
        notice: '研讨间需预约开放，电竞馆 8:00-21:30',
        type: 'facility'
      },
      {
        id: 103,
        name: '体育馆',
        image: '/images/gym-exterior.jpg',
        description: '室内体育馆，配备篮球场、羽毛球场、乒乓球室、健身房等设施。',
        openTime: '周一至周日 8:00-21:00',
        isOpen: true,
        location: '南浔校区',
        notice: '请穿运动鞋入场',
        type: 'facility'
      },
      {
        id: 104,
        name: '浙江水文化教育基地',
        image: '/images/shuiwenhuajidi.png',
        description: '浙江省水文化研究平台，展示水利水电历史文化，免费向公众开放。',
        openTime: '每天 8:30-16:00',
        isOpen: true,
        location: '钱塘校区',
        notice: '参观需提前一天预约，双休日及寒暑假请电话确认（黄老师：13706710915）',
        type: 'facility'
      }
    ]
  },

  // 预览风光图片 - 跳转到预览页面
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.sceneryList.map(item => item.image);
    const names = this.data.sceneryList.map(item => item.name);

    wx.navigateTo({
      url: '/pages/image-preview/image-preview?index=' + index +
           '&images=' + encodeURIComponent(JSON.stringify(urls)) +
           '&names=' + encodeURIComponent(JSON.stringify(names))
    });
  },

  // 预览设施图片
  previewFacilityImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.facilitiesList.map(item => item.image);
    const names = this.data.facilitiesList.map(item => item.name);

    wx.navigateTo({
      url: '/pages/image-preview/image-preview?index=' + index +
           '&images=' + encodeURIComponent(JSON.stringify(urls)) +
           '&names=' + encodeURIComponent(JSON.stringify(names))
    });
  },

  // 点击设施跳转详情页
  goFacilityDetail(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.facilitiesList.find(f => f.id === id);

    // 关闭状态禁用点击
    if (item && !item.isOpen) {
      wx.showToast({
        title: '该设施暂未开放',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: `/pages/scenery-detail/scenery-detail?id=${id}`
    });
  }
});
