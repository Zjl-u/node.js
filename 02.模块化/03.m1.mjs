// ES 模块化
// 向外导出内容
export let a = 10
export const b = '川川'
export const c = { name: "cc" }

// 设置默认导出,一个模块只有一个默认导出,只能导出一个值，不能用let，const
export default function sum(a, b) {
    return a + b
}