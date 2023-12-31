import { h } from "vue";
import type { App, Plugin, Component, VNodeChild } from "vue";
import { NIcon, NTag } from "naive-ui";

/**
 * render 图标
 * */
export function renderIcon(icon):(() => VNodeChild) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
/**
 * font 图标(Font class)
 * */
export function renderFontClassIcon(icon: string, iconName = "iconfont") {
  return () => h("span", { class: [iconName, icon] });
}
/**
 * font 图标(Unicode)
 * */
export function renderUnicodeIcon(icon: string, iconName = "iconfont") {
  return () => h("span", { class: [iconName], innerHTML: icon });
}
/**
 * font svg 图标
 * */
export function renderfontsvg(icon) {
  return () =>
    h(NIcon, null, {
      default: () =>
        h(
          "svg",
          { class: `icon`, "aria-hidden": "true" },
          h("use", { "xlink:href": `#${icon}` })
        ),
    });
}

/**
 * render new Tag
 * */
const newTagColors = { color: "#f90", textColor: "#fff", borderColor: "#f90" };
export function renderNew(
  type = "warning",
  text = "New",
  color: object = newTagColors
) {
  return () =>
    h(
      NTag as any,
      {
        type,
        round: true,
        size: "small",
        color,
      },
      { default: () => text }
    );
}

/**
 * 分组菜单
 * */
export function groupMenu(menus: any[], sort: any[]): any[] {
  const groupedMenus: any[] = menus.reduce((result: any[], menu: any) => {
    const groupValue = menu.meta?.group || "";
    const existingGroup = result.find((item) => item.group === groupValue);

    if (existingGroup) {
      existingGroup.menus.push(menu);
    } else {
      result.push({ group: groupValue, menus: [menu] });
    }

    return result;
  }, []);

  groupedMenus.sort((a, b) => {
    const indexA = sort.indexOf(a.group);
    const indexB = sort.indexOf(b.group);

    if (indexA === -1 && indexB === -1) {
      return 0; // Preserve original order if both groups are not in the sort array
    } else if (indexA === -1) {
      return 1; // Move group B to a higher index since group A is not in the sort array
    } else if (indexB === -1) {
      return -1; // Move group A to a higher index since group B is not in the sort array
    }

    return indexA - indexB; // Sort based on the index in the sort array
  });

  return groupedMenus;
}

/**
 * 判断根路由 Router
 * */
export function isRootRouter(item) {
  return (
    item.meta?.alwaysShow != true &&
    item?.children?.filter((item) => !Boolean(item?.meta?.hidden))?.length === 1
  );
}

export const withInstall = <T extends Component>(
  component: T,
  alias?: string
) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

/**
 *  找到对应的节点
 * */
let result = null;
export function getTreeItem(data: any[], key?: string | number): any {
  data.map((item) => {
    if (item.key === key) {
      result = item;
    } else {
      if (item.children && item.children.length) {
        getTreeItem(item.children, key);
      }
    }
  });
  return result;
}

/**
 *  找到所有节点
 * */
const treeAll: any[] = [];
export function getTreeAll(data: any[]): any[] {
  data.map((item) => {
    treeAll.push(item.key);
    if (item.children && item.children.length) {
      getTreeAll(item.children);
    }
  });
  return treeAll;
}

/**
 * Sums the passed percentage to the R, G or B of a HEX color
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed part of the color
 */
function addLight(color: string, amount: number) {
  const cc = parseInt(color, 16) + amount;
  const c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
}

/**
 * Lightens a 6 char HEX color according to the passed percentage
 * @param {string} color The color to change
 * @param {number} amount The amount to change the color by
 * @returns {string} The processed color represented as HEX
 */
export function lighten(color: string, amount: number) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return `#${addLight(color.substring(0, 2), amount)}${addLight(
    color.substring(2, 4),
    amount
  )}${addLight(color.substring(4, 6), amount)}`;
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
  return /^(http|https):\/\//g.test(url);
}
