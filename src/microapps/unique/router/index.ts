import { renderIcon } from "!/template/utils";
import { Reward24Regular, ShieldKeyhole24Regular, TabInprivateAccount24Regular, TvUsb24Regular } from "@vicons/fluent";
import { RouteRecordRaw } from "vue-router";
import sideView from "~/views/sideView.vue";

const routes: RouteRecordRaw = {
  path: "/",
  name: "microapps",
  meta: {
    subtitle: "包含所有的标准，可选择分类方式",
    iconName: 'PersonTag24Regular',
    group: "开发者",

  },
  component: sideView,
  children: [
    {
      path: "list",
      name: "全部应用",
      component: () => import("@/unique/views/list.vue"),
      meta: {
        icon: renderIcon(TabInprivateAccount24Regular),
        breadcrumb: false,
        group: "开发者",
        divider: true
      }
    },
    {
      path: "reg",
      name: "应用注册",
      component: () => import("@/unique/views/list.vue"),
      meta: {
        icon: renderIcon(TabInprivateAccount24Regular),
        breadcrumb: false,
        group: "开发者",
      }
    },
  ],
};

export default routes;
