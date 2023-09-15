<template>
  <div>
    <Space direction="vertical" style="width: 100%" :size="20">
      <div class="search-region">
        <InputGroup compact>
          <Select class="tubiao" v-model:value="engine" size="large">
            <template #suffixIcon></template>
            <SelectOption value="Google Search">
              <Avatar :src="GoogleImg" :size="26"></Avatar>
            </SelectOption>
            <SelectOption value="Bing Search">
              <Avatar :src="BingImg" :size="26"></Avatar>
            </SelectOption>
          </Select>
          <AutoComplete
              style="width: 80%"
              v-model:value="search"
              :options="options"
              @change="searchHandle"
              @select="onSelect"
          >
            <template #option="{ value: val }">
              <div v-html="val"></div>
            </template>
            <InputSearch size="large" @search="submit" :placeholder="engine">
            </InputSearch>
          </AutoComplete>
        </InputGroup>
      </div>
      <div class="bookmarks">
        <Space direction="vertical" :size="15">
          <Menu v-model:selectedKeys="activeBookMark" mode="horizontal" :items="bookmarks"></Menu>
          <Space :size="40" wrap>
            <div v-for="site in sites" style="cursor: pointer">
              <Space direction="vertical" v-if="site.hasOwnProperty('url')" @click="open(site['url'])">
                <Avatar v-contextmenu:contextmenu @contextmenu="() => handleContextMenu(site['id'])" shape="square" v-if="IconMap.hasOwnProperty(site['id'])" :src="IconMap[site['id']]" :size="50"></Avatar>
                <Avatar v-contextmenu:contextmenu @contextmenu="() => handleContextMenu(site['id'])" shape="square" v-else :size="50" style="background-color: #90caf9">{{
                    site["title"][0]
                  }}
                </Avatar>
                <div class="double-line" style="width: 50px; color: white; text-align: center">{{ site["title"] }}</div>
              </Space>
            </div>
          </Space>
        </Space>
      </div>
    </Space>
    <Contextmenu ref="contextmenu">
      <ContextmenuItem @click="replaceShow=true">替换图标</ContextmenuItem>
    </Contextmenu>
    <Modal v-model:open="replaceShow" title="替换图标" @ok="replaceIcon">
      <Input v-model:value="currentIconUrl"></Input>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch, computed, onMounted} from "vue"
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import GoogleImg from "../assets/google.png"
import BingImg from "../assets/bing.png"
import axios from "axios";
import {
  InputGroup,
  Select,
  SelectOption,
  AutoComplete,
  InputSearch,
  Input,
  Avatar,
  Dropdown,
  Menu,
  MenuItem,
  Space,
  Modal
} from "ant-design-vue"

const searchUrl = `https://www.google.com/complete/search?client=chrome&q=`
const engine = ref("Google Search")
let _engine = localStorage.getItem("SUK_TAB_ENGINE")
if (_engine) {
  engine.value = _engine
}
const search = ref("")
watch(engine, () => {
  localStorage.setItem("SUK_TAB_ENGINE", engine.value)
})
const options = ref<{ value: string }[]>([])
const searchHandle = () => {
  axios.get(`https://www.google.com/complete/search?client=chrome&q=${search.value}`).then(res => {
    options.value = [{value: search.value}].concat(res.data[1].map(item => {
      return {value: item}
    }))
  })
}
const onSelect = (v: string) => {
  let k = document.createElement("span")
  k.innerHTML = v
  search.value = k.innerText
  submit()
}
const submit = () => {
  if (engine.value == "Google Search") {
    window.location.href = `https://www.google.com/search?q=${search.value}`
  } else {
    window.location.href = `https://cn.bing.com/search?q=${search.value}`
  }

}

const activeBookMark = ref()
const bookmarks = ref()
// const bookmarks = ref([
//     {
//         "key": "200",
//         "label": "运维",
//         "title": "运维",
//         "sites": [
//             {
//                 "dateAdded": 1688959648006,
//                 "dateLastUsed": 1691143631292,
//                 "id": "199",
//                 "index": 0,
//                 "parentId": "200",
//                 "title": "恺英wiki",
//                 "url": "https://wiki.kyhub.cn/pages/viewpage.action?pageId=14773487"
//             },
//             {
//                 "dateAdded": 1688960407696,
//                 "dateLastUsed": 1694668504828,
//                 "id": "201",
//                 "index": 1,
//                 "parentId": "200",
//                 "title": "阿里云",
//                 "url": "https://cn.aliyun.com/"
//             },
//             {
//                 "dateAdded": 1688961554940,
//                 "dateLastUsed": 1694397558868,
//                 "id": "203",
//                 "index": 2,
//                 "parentId": "200",
//                 "title": "腾讯云",
//                 "url": "https://console.cloud.tencent.com/developer"
//             },
//             {
//                 "dateAdded": 1688967703924,
//                 "dateLastUsed": 1694569045982,
//                 "id": "205",
//                 "index": 3,
//                 "parentId": "200",
//                 "title": "导航页 - Kingnet Dashboard",
//                 "url": "https://d.kyhub.cn/#/rocket"
//             },
//             {
//                 "dateAdded": 1688970488861,
//                 "dateLastUsed": 1689558536405,
//                 "id": "206",
//                 "index": 4,
//                 "parentId": "200",
//                 "title": "oops",
//                 "url": "https://oops.kyhub.cn/dashboard/workplace"
//             },
//             {
//                 "dateAdded": 1688972702594,
//                 "dateLastUsed": 1694568835000,
//                 "id": "207",
//                 "index": 5,
//                 "parentId": "200",
//                 "title": "华为云",
//                 "url": "https://auth.huaweicloud.com/authui/login.html?id=kingnet1012#/login"
//             },
//             {
//                 "dateAdded": 1689646473082,
//                 "id": "209",
//                 "index": 6,
//                 "parentId": "200",
//                 "title": "CloudFlow",
//                 "url": "https://cloudflow-workflow.kyhub.cn/executions"
//             },
//             {
//                 "dateAdded": 1691112690140,
//                 "dateLastUsed": 1693892165073,
//                 "id": "211",
//                 "index": 7,
//                 "parentId": "200",
//                 "title": "火山引擎",
//                 "url": "https://console.volcengine.com/auth/login/user/?redirectURI=%2F%2Fwww.volcengine.com%2Fproduct%2Fecs%3Fbd_vid%3D7708451091147187711"
//             }
//         ]
//     },
//     {
//         "key": "198",
//         "label": "oa",
//         "title": "oa",
//         "sites": [
//             {
//                 "dateAdded": 1688958229577,
//                 "dateLastUsed": 1694400670474,
//                 "id": "197",
//                 "index": 0,
//                 "parentId": "198",
//                 "title": "恺英OA办公系统",
//                 "url": "https://oa.kingnet.com/"
//             },
//             {
//                 "dateAdded": 1688965149451,
//                 "dateLastUsed": 1691641104669,
//                 "id": "204",
//                 "index": 1,
//                 "parentId": "198",
//                 "title": "上海恺英网络科技有限公司 - 收件箱",
//                 "url": "http://mail.kingnet.com/cgi-bin/frame_html?sid=bcLs1jFCBJ80-ihM,2&sign_type=&r=839e3cf6e6b14da8bea9d9a2bb67c12e"
//             }
//         ]
//     },
//     {
//         "key": "105",
//         "label": "k8s",
//         "title": "k8s",
//         "sites": [
//             {
//                 "dateAdded": 1635414491891,
//                 "dateLastUsed": 1689843934932,
//                 "id": "91",
//                 "index": 0,
//                 "parentId": "105",
//                 "title": "k8s官网",
//                 "url": "https://kubernetes.io/docs/home/"
//             },
//             {
//                 "dateAdded": 1641796931848,
//                 "dateLastUsed": 1685337972009,
//                 "id": "104",
//                 "index": 1,
//                 "parentId": "105",
//                 "title": "Docker：网络模式详解 - Gringer - 博客园",
//                 "url": "https://www.cnblogs.com/zuxing/articles/8780661.html"
//             },
//             {
//                 "dateAdded": 1640851435697,
//                 "dateLastUsed": 1673834055146,
//                 "id": "102",
//                 "index": 2,
//                 "parentId": "105",
//                 "title": "clientgo",
//                 "url": "https://pkg.go.dev/k8s.io/client-go@v0.23.1#section-readme"
//             },
//             {
//                 "dateAdded": 1628471883747,
//                 "id": "87",
//                 "index": 3,
//                 "parentId": "105",
//                 "title": "使用Node Exporter采集主机数据 · Prometheus中文技术文档",
//                 "url": "https://www.prometheus.wang/quickstart/use-node-exporter.html"
//             },
//             {
//                 "dateAdded": 1635743701362,
//                 "id": "92",
//                 "index": 4,
//                 "parentId": "105",
//                 "title": "gin demo",
//                 "url": "https://gitee.com/lixiaobin2018/lb-go-webapi-demo/tree/master"
//             },
//             {
//                 "dateAdded": 1646878847355,
//                 "id": "113",
//                 "index": 5,
//                 "parentId": "105",
//                 "title": "部署附加组件 - 以 Daemonset 方式部署 kube-proxy - 《Kubernetes 实践指南（Kubernetes Practice Guide）》 - 书栈网 · BookStack",
//                 "url": "https://www.bookstack.cn/read/kubernetes-practice-guide/deploy-addons-kube-proxy.md"
//             },
//             {
//                 "dateAdded": 1650363221106,
//                 "dateLastUsed": 1684914910251,
//                 "id": "118",
//                 "index": 6,
//                 "parentId": "105",
//                 "title": "Admission Webhook 简介 + 示例 - 简书",
//                 "url": "https://www.jianshu.com/p/00c69b992e3f"
//             },
//             {
//                 "dateAdded": 1643338893314,
//                 "id": "108",
//                 "index": 7,
//                 "parentId": "105",
//                 "title": "云原生",
//                 "url": "https://jimmysong.io/kubernetes-handbook/cloud-native/the-future-of-cloud-native.html"
//             },
//             {
//                 "dateAdded": 1643335504522,
//                 "id": "107",
//                 "index": 8,
//                 "parentId": "105",
//                 "title": "CNCF_Kubernetes中文社区",
//                 "url": "https://www.kubernetes.org.cn/tags/cncf"
//             },
//             {
//                 "dateAdded": 1645435157936,
//                 "id": "110",
//                 "index": 9,
//                 "parentId": "105",
//                 "title": "CNCF x Alibaba 云原生技术公开课 - 云原生教程 - 阿里云全球培训中心",
//                 "url": "https://edu.aliyun.com/roadmap/cloudnative?spm=a1z389.11499242.0.0.65452413sISWj4&utm_content=g_1000072542"
//             },
//             {
//                 "dateAdded": 1656590458998,
//                 "id": "132",
//                 "index": 10,
//                 "parentId": "105",
//                 "title": "(9条消息) 云原生 CI/CD 框架 Tekton 初体验_脑瓜凉的博客-CSDN博客",
//                 "url": "https://blog.csdn.net/lidew521/article/details/120718010?ops_request_misc=&request_id=&biz_id=102&utm_term=ci/cd%20%E4%BD%93%E9%AA%8C&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-120718010.142^v28^control,157^v15^new_3&spm=1018.2226.3001.4187"
//             },
//             {
//                 "dateAdded": 1659003908427,
//                 "id": "137",
//                 "index": 11,
//                 "parentId": "105",
//                 "title": "Gin 配置 Swagger 接口文档",
//                 "url": "https://wnanbei.github.io/post/gin-%E9%85%8D%E7%BD%AE-swagger-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/"
//             },
//             {
//                 "dateAdded": 1659926872175,
//                 "id": "140",
//                 "index": 12,
//                 "parentId": "105",
//                 "title": "jetbrain激活",
//                 "url": "https://bafybeiazdy6cpftzahp6iv3s5sw6r4g5232z3sxktt6deahli4zz7lvoa4.ipfs.nftstorage.link/"
//             },
//             {
//                 "dateAdded": 1664263266154,
//                 "dateLastUsed": 1684831451472,
//                 "id": "148",
//                 "index": 13,
//                 "parentId": "105",
//                 "title": "logging operator",
//                 "url": "https://blog.csdn.net/u010533742/article/details/124609511"
//             },
//             {
//                 "dateAdded": 1667471166503,
//                 "dateLastUsed": 1684914936689,
//                 "id": "154",
//                 "index": 14,
//                 "parentId": "105",
//                 "title": "如何部署自己的webhook admission - 知乎",
//                 "url": "https://zhuanlan.zhihu.com/p/137070531"
//             },
//             {
//                 "dateAdded": 1668149295136,
//                 "dateLastUsed": 1684915480288,
//                 "id": "156",
//                 "index": 15,
//                 "parentId": "105",
//                 "title": "浅谈 Kubernetes Scheduling-Framework 插件的实现 - 知乎",
//                 "url": "https://zhuanlan.zhihu.com/p/113620537"
//             },
//             {
//                 "dateAdded": 1670899021725,
//                 "dateLastUsed": 1685960693246,
//                 "id": "162",
//                 "index": 16,
//                 "parentId": "105",
//                 "title": "CNI",
//                 "url": "https://www.cni.dev/"
//             },
//             {
//                 "dateAdded": 1671594476996,
//                 "dateLastUsed": 1672926991911,
//                 "id": "164",
//                 "index": 17,
//                 "parentId": "105",
//                 "title": " CIlium 容器网络的探索和实践",
//                 "url": "https://www.infoq.cn/article/p9vG2G9T49KpvHrckFwu"
//             },
//             {
//                 "dateAdded": 1675215236566,
//                 "dateLastUsed": 1685438181075,
//                 "id": "171",
//                 "index": 19,
//                 "parentId": "105",
//                 "title": "K8S 开发",
//                 "url": "https://www.notion.so/cnych/K8S-b33520bf4f2c4005adb66f5ee1785502"
//             },
//             {
//                 "dateAdded": 1677313607565,
//                 "dateLastUsed": 1679472244822,
//                 "id": "175",
//                 "index": 20,
//                 "parentId": "105",
//                 "title": "Rowan Luo · 语雀",
//                 "url": "https://www.yuque.com/wei.luo"
//             },
//             {
//                 "dateAdded": 1678417756526,
//                 "dateLastUsed": 1685959122941,
//                 "id": "179",
//                 "index": 21,
//                 "parentId": "105",
//                 "title": "cilium",
//                 "url": "https://docs.cilium.io/en/stable/"
//             },
//             {
//                 "dateAdded": 1682241396064,
//                 "id": "181",
//                 "index": 22,
//                 "parentId": "105",
//                 "title": "Longhorn",
//                 "url": "https://www.cnblogs.com/hacker-linner/p/15151778.html"
//             },
//             {
//                 "dateAdded": 1682244979292,
//                 "id": "182",
//                 "index": 23,
//                 "parentId": "105",
//                 "title": "k8s之PV、PVC、StorageClass",
//                 "url": "https://cloud.tencent.com/developer/article/1755618"
//             },
//             {
//                 "dateAdded": 1682254494490,
//                 "dateLastUsed": 1684228135366,
//                 "id": "183",
//                 "index": 24,
//                 "parentId": "105",
//                 "title": "longhorn配置",
//                 "url": "https://blog.csdn.net/leadersnowy/article/details/123553510"
//             },
//             {
//                 "dateAdded": 1682331351392,
//                 "dateLastUsed": 1684228147581,
//                 "id": "186",
//                 "index": 25,
//                 "parentId": "105",
//                 "title": "Longhorn 架构",
//                 "url": "https://www.bilibili.com/video/BV1ZD4y1i7fp/?spm_id_from=333.337.search-card.all.click&vd_source=6aa2310883b02e4ef65b5806a218ceef"
//             },
//             {
//                 "dateAdded": 1682659507170,
//                 "dateLastUsed": 1684905778952,
//                 "id": "188",
//                 "index": 26,
//                 "parentId": "105",
//                 "title": "killercoda",
//                 "url": "https://killercoda.com/killer-shell-cks/scenario/playground"
//             },
//             {
//                 "dateAdded": 1682659569947,
//                 "dateLastUsed": 1684896939226,
//                 "id": "189",
//                 "index": 27,
//                 "parentId": "105",
//                 "title": "cloudyuga",
//                 "url": "https://cloudyuga.guru/"
//             }
//         ]
//     },
//     {
//         "key": "159",
//         "label": "前端",
//         "title": "前端",
//         "sites": [
//             {
//                 "dateAdded": 1669629586053,
//                 "dateLastUsed": 1686562824741,
//                 "id": "158",
//                 "index": 0,
//                 "parentId": "159",
//                 "title": "Typography | Windi CSS",
//                 "url": "https://windicss.org/utilities/general/typography.html#text-color"
//             },
//             {
//                 "dateAdded": 1670379686058,
//                 "dateLastUsed": 1689325166007,
//                 "id": "160",
//                 "index": 1,
//                 "parentId": "159",
//                 "title": "介绍 | Vben Admin",
//                 "url": "https://doc.vvbin.cn/guide/introduction.html#%E6%96%87%E6%A1%A3"
//             },
//             {
//                 "dateAdded": 1678082224308,
//                 "dateLastUsed": 1694583769388,
//                 "id": "177",
//                 "index": 2,
//                 "parentId": "159",
//                 "title": "Ant Design Vue",
//                 "url": "https://www.antdv.com/components/overview-cn"
//             },
//             {
//                 "dateAdded": 1666233760292,
//                 "dateLastUsed": 1678795479720,
//                 "id": "152",
//                 "index": 3,
//                 "parentId": "159",
//                 "title": "json2ts - generate TypeScript interfaces from json",
//                 "url": "http://www.json2ts.com/"
//             },
//             {
//                 "dateAdded": 1660806605075,
//                 "dateLastUsed": 1682573297336,
//                 "id": "142",
//                 "index": 4,
//                 "parentId": "159",
//                 "title": "json2ts",
//                 "url": "https://chpshy.github.io/json2ts/index.html"
//             },
//             {
//                 "dateAdded": 1659595327142,
//                 "id": "138",
//                 "index": 5,
//                 "parentId": "159",
//                 "title": "文字生成",
//                 "url": "https://wordart.com/create"
//             },
//             {
//                 "dateAdded": 1661154987766,
//                 "id": "144",
//                 "index": 6,
//                 "parentId": "159",
//                 "title": "Logo在线制作；logo设计神器 - 标小智LOGO神器",
//                 "url": "https://www.logosc.cn/make"
//             },
//             {
//                 "dateAdded": 1683698435693,
//                 "dateLastUsed": 1694483769270,
//                 "id": "191",
//                 "index": 7,
//                 "parentId": "159",
//                 "title": "组件 | Element",
//                 "url": "https://element.eleme.cn/#/zh-CN/component/installation"
//             },
//             {
//                 "dateAdded": 1692327847797,
//                 "id": "213",
//                 "index": 8,
//                 "parentId": "159",
//                 "title": "Json2Ts",
//                 "url": "https://www.json2ts.app/"
//             },
//             {
//                 "dateAdded": 1692943020616,
//                 "dateLastUsed": 1694410835032,
//                 "id": "214",
//                 "index": 9,
//                 "parentId": "159",
//                 "title": "Naive UI",
//                 "url": "https://www.naiveui.com/zh-CN/os-theme/components/tag"
//             },
//             {
//                 "dateAdded": 1693186534274,
//                 "dateLastUsed": 1693190199461,
//                 "id": "216",
//                 "index": 10,
//                 "parentId": "159",
//                 "title": "ui设计",
//                 "url": "https://shuffle.dev/new"
//             },
//             {
//                 "dateAdded": 1693187778526,
//                 "dateLastUsed": 1694400162810,
//                 "id": "217",
//                 "index": 11,
//                 "parentId": "159",
//                 "title": "Dora AI",
//                 "url": "https://www.dora.run/ai"
//             },
//             {
//                 "dateAdded": 1693217532519,
//                 "dateLastUsed": 1694400164452,
//                 "id": "223",
//                 "index": 12,
//                 "parentId": "159",
//                 "title": "Panda",
//                 "url": "https://app.usepanda.com/#/"
//             }
//         ]
//     },
//     {
//         "key": "220",
//         "label": "ai",
//         "title": "ai",
//         "sites": [
//             {
//                 "dateAdded": 1682321400797,
//                 "dateLastUsed": 1694656527492,
//                 "id": "185",
//                 "index": 0,
//                 "parentId": "220",
//                 "title": "文心一言",
//                 "url": "https://yiyan.baidu.com/"
//             },
//             {
//                 "dateAdded": 1693199756972,
//                 "id": "221",
//                 "index": 1,
//                 "parentId": "220",
//                 "title": "TXYZ - Chat With Knowledge",
//                 "url": "https://txyz.ai/"
//             },
//             {
//                 "dateAdded": 1693473268673,
//                 "dateLastUsed": 1694514700339,
//                 "id": "225",
//                 "index": 2,
//                 "parentId": "220",
//                 "title": "Bing",
//                 "url": "https://www.bing.com/?setmkt=en-US&setlang=en-US"
//             }
//         ]
//     }
// ])
const IconMap = ref({})
let _iconMap =  localStorage.getItem("SUK_TAB_ICON_MAP")
if (_iconMap){
  try {
    IconMap.value = JSON.parse(_iconMap)
  }catch (e){
    IconMap.value = {}
  }
}
chrome.bookmarks.getSubTree("1").then(async (res) => {
  let marks = []
  for (let mark of res[0].children) {
    if (mark["url"]) {
      continue
    }
    let sites = []
    for (let site of mark["children"]) {
      if (site.hasOwnProperty("url")) {
        if (!IconMap.value.hasOwnProperty(site['id'])){
          getIconUrl(site['url']).then(url => {
            IconMap.value[site['id']] = url
            localStorage.setItem("SUK_TAB_ICON_MAP", JSON.stringify(IconMap.value))
          }).catch(err => {
            console.log(err)
          })
        }
        sites.push(site)
      }
    }
    marks.push({
      "key": mark["id"],
      "label": mark["title"],
      "title": mark["title"],
      "sites": sites
    })
  }
  bookmarks.value = marks
  console.log(marks)
  activeBookMark.value = marks.length > 0 ? [marks[0].key] : undefined
})


const sites = computed(() => {
  return activeBookMark.value ? bookmarks.value.find(item => item.key === activeBookMark.value[0]).sites : []
})

const _getIconUrl = (_url, suffix, google = false) => {
  let a = new URL(_url)
  let url = `${a.origin}/${suffix}`
  if (google) {
    url = `http://www.google.com/s2/favicons?domain=${a.host}`
  }
  return new Promise((resolve, reject) => {
    // 创建一个新的Image对象
    const img = new Image();
    img.src = url;

    img.onload = () => {
      // 当图片加载完成后，获取图片的宽度和高度
      const width = img.width;
      const height = img.height;

      // 如果图片宽度和高度都大于0，则表示图片加载成功，返回图片的src属性作为网站icon地址
      if (width > 0 && height > 0) {
        resolve(url);
      } else {
        reject(new Error('无法获取网站icon地址'));
      }
    };

    img.onerror = () => {
      // 当图片加载失败时，抛出错误
      reject(new Error('无法获取网站icon地址'));
    };
  });
}

const open = (url) => {
  window.location.href = url
}

const getIconUrl = (_url) => {
  let a = new URL(_url)
  let url = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${a.origin}&size=50`

  return isRunUrl(url).then(_ => {return url})
}

const isRunUrl = (url) => {
   return  axios.get(url)
}

const  vContextmenu = directive
const replaceShow = ref(false)
const currentSiteId = ref()
const currentIconUrl = ref()
const replaceIcon = () => {
  console.log(currentIconUrl.value)
  IconMap.value[currentSiteId.value] = currentIconUrl.value
  console.log(IconMap.value)
  localStorage.setItem("SUK_TAB_ICON_MAP", JSON.stringify(IconMap.value))
  replaceShow.value = false
}
const handleContextMenu = (id) => {
  currentSiteId.value = id
  currentIconUrl.value = IconMap.value[currentSiteId.value]
}
</script>

<style>
.tubiao .ant-select-selection-item {
  padding-inline-end: 0 !important;
}

.tubiao .ant-select-selector {
  border-start-start-radius: 18px !important;
  border-end-start-radius: 18px !important;
}

.ant-select-item-option {
  padding: 5px !important;
}

.ant-input-search-button {
  border-start-end-radius: 18px !important;
  border-end-end-radius: 18px !important;
}

.search-region .ant-input:focus, .search-region .ant-input:hover {
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
  border-inline-end-width: 0;
  outline: 0;
}

.search-region .ant-input {
  border-left: none !important;
  border-right: none !important;
}

.search-region .ant-select-selection-item {
  display: flex !important;
  align-items: center !important;
}

.search-region .ant-select-selector:hover {
  border-color: #d9d9d9 !important;
  border-right: none !important;
  border-inline-end-width: 0
}

.search-region .ant-select-selector {
  border-right: none !important;
  border-inline-end-width: 0
}

:where(.css-kqecok).ant-btn-default:not(:disabled):hover{
  border-color: #d9d9d9 !important;
}

.search-region .ant-select-focused:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-disabled):not(.ant-select-customize-input):not(.ant-pagination-size-changer) .ant-select-selector {
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
}

.search-region .ant-input-search-button {
  border-left: none;
  color: #d9d9d9 !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-input-search > .ant-input-group > .ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary):hover {
  color: grey !important;
  border-color: #d9d9d9 !important;
  box-shadow: none !important;
}

.ant-menu-root {
  background: none !important;
  line-height: 20px !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-menu-light {
  background-color: rgba(0, 0, 0, 0) !important;
}

:where(.css-dev-only-do-not-override-kqecok).ant-menu-horizontal {
  line-height: 20px !important;
}

.ant-menu-submenu-title {
  line-height: 20px !important;
}

.ant-menu-item-selected {
  color: black !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 7px !important;
  margin-right: 10px !important;
  overflow: hidden;
}

.ant-menu-item {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 7px !important;
  margin-right: 10px !important;
  overflow: hidden;
}
.ant-menu-item:hover{
  background-color: rgba(255, 255, 255, 0.7) !important
}

.double-line {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>