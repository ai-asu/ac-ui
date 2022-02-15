import {createRouter, createWebHashHistory} from 'vue-router'
import navConfig from '@/json/nav.config.json'

const registerRoute = (navConfig) => {
  const route = [{
    path: '/',
    redirect: `/installation`,
  }]
  navConfig.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(nav => {
          addRoute(nav, group.groupName)
        })
      })
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav)
      })
    } else {
      addRoute(nav)
    }
  })
  function addRoute(page, groupName) {
		const child = {
      path: page.path,
      meta: {
        title: page.name
      },
      name: 'component-' + page.name,
      component: () => {
        // return groupName ? import(`@/views/${groupName.toLowerCase()}${page.path}`) : import(`@/views${page.path}`)
        return groupName ? import(`@/docs/${groupName.toLowerCase()}${page.path}.md`) : import(`@/docs${page.path}.md`)
      }
    }

		route.push(child)
  }
  return route
}
const routes = registerRoute(navConfig)

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(() => {
  document.querySelector('.ac-scrollbar.page-component__scroll>.ac-scrollbar__wrap.ac-scrollbar__wrap--hidden-default').scrollTop = 0
})

export default router
