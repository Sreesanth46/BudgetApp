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
				path: '/groups/create',
				name: 'Create Group',
				component: () => import("@views/CreateGroup.vue")
			},

			{
				path: '/expenses',
				name: 'Expenses',
				component: () => import("@views/Expenses.vue")
			},

			{
				path: '/expense/create/:id',
				name: 'Create Expense',
				props: route => ({ groupId: route.params.id }),
				component: () => import("@views/CreateExpense.vue")
			},

			{
				path: '/expense/edit',
				name: 'Edit Expense',
				component: () => import("@views/CreateExpense.vue")
			},

			{
				path: '/expense/:id/split',
				name: 'Split Expense',
				props: route => ({ expenseId: route.params.id }),
				component: () => import("@views/SplitExpense.vue")
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
	if (Authenticated && !getIsLoggedIn.value) return { name: 'Login' }
})

export default router
