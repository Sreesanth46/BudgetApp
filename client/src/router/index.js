import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@stores/UserStore'
import { storeToRefs } from 'pinia';

const routes = [

	{
		path: '/register',
		name: 'Register',
		component: () => import("@/views/Register.vue")
	},

	{
		path: '/signup',
		name: 'Signup',
		component: () => import("@/views/Signup.vue"),
		props: route => ({ token: route.query.token })
	},

	{
		path: '/login',
		name: 'Login',
		component: () => import("@/views/Login.vue")
	},

	{
		path: '/',
		name: 'Body',
		redirect: { name: 'Dashboard' },
		component: () => import("@/views/HomeView.vue"),
		meta: { Authenticated: true },
		children: [

			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import("@views/Dashboard.vue")
			},

			{
				path: '/groups',
				name: 'Groups',
				component: () => import("@views/Groups.vue")
			},

			{
				path: '/expenses',
				name: 'Expenses',
				component: () => import("@views/Expenses.vue")
			},

			{
				path: '/expenses/create',
				name: 'CreateExpense',
				component: () => import("@views/CreateExpense.vue")
			},
		]
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
	linkActiveClass: 'bg-gray-300'
})

router.beforeEach(async (to, from) => {
	const { Authenticated } = to.meta;
	const userStore = useUserStore();
	const { getIsLoggedIn } = storeToRefs(userStore)
	if (Authenticated && !getIsLoggedIn) return { name: 'Login' }
})

export default router
